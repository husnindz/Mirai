import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ── Page config ──────────────────────────────────────────────────
st.set_page_config(page_title="Dashboard Medical Check-up", layout="wide")
st.title("Dashboard Analisis Medical Check-up 🏥")
st.markdown("Analisis pola kunjungan dan diagnosa pasien berdasarkan data rekam medis periode Februari–April 2026.")

# ── Load data ────────────────────────────────────────────────────
@st.cache_data
def load_data():
    df = pd.read_csv("../dokter_all.csv")
    return df

df = load_data()

TARGET_UNITS = ['SPES. PENYAKIT DALAM', 'JANTUNG DAN PEMBULUH DARAH', 'SPES. PARU PARU']
UNIT_LABEL = {
    'SPES. PENYAKIT DALAM': 'Penyakit Dalam',
    'JANTUNG DAN PEMBULUH DARAH': 'Jantung',
    'SPES. PARU PARU': 'Paru-Paru'
}
BULAN_ORDER = ['Februari', 'Maret', 'April']

df_focus = df[df['NM_UNIT'].isin(TARGET_UNITS)].copy()
df_focus['NM_UNIT_LABEL'] = df_focus['NM_UNIT'].map(UNIT_LABEL)

def usia_group(umur):
    if pd.isna(umur): return 'Tidak Diketahui'
    if umur < 18: return '< 18'
    if umur < 40: return '18–39'
    if umur < 60: return '40–59'
    return '≥ 60'

df_focus['KELOMPOK_USIA'] = df_focus['UMUR_TAHUN'].apply(usia_group)
df_focus['JENIS_KELAMIN_LABEL'] = df_focus['JENIS_KELAMIN'].map({'L': 'Laki-laki', 'P': 'Perempuan'})

# ── Sidebar ──────────────────────────────────────────────────────
st.sidebar.header("Filter Data")
selected_bulan = st.sidebar.selectbox("Pilih Bulan", options=['Semua'] + BULAN_ORDER)

# Apply filter bulan ke semua section
filtered = df_focus.copy()
if selected_bulan != 'Semua':
    filtered = filtered[filtered['bulan'] == selected_bulan]

# ── Metrics ──────────────────────────────────────────────────────
st.subheader("📊 Ringkasan")
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Kunjungan", len(filtered))
col2.metric("Pasien Perempuan", int((filtered['JENIS_KELAMIN'] == 'P').sum()))
col3.metric("Pasien Laki-laki", int((filtered['JENIS_KELAMIN'] == 'L').sum()))
col4.metric("Rata-rata Usia", f"{filtered['UMUR_TAHUN'].mean():.1f} th" if not filtered.empty else "-")

st.markdown("---")

# ── P1 ───────────────────────────────────────────────────────────
st.subheader("Distribusi Pasien & Penyakit Terbanyak")

col_a, col_b, col_c = st.columns([2, 1, 1])

with col_a:
    st.markdown("**Top 5 Penyakit Terbanyak**")
    top5 = filtered['NM_PENYAKIT'].value_counts().head(5).reset_index()
    top5.columns = ['Penyakit', 'Jumlah']
    fig1, ax1 = plt.subplots(figsize=(10, 5))
    sns.barplot(data=top5, x='Jumlah', y='Penyakit', ax=ax1, palette='Blues_r')
    ax1.set_xlabel("Jumlah Kasus")
    ax1.set_ylabel("")
    ax1.set_title("5 Penyakit Terbanyak")
    for i, v in enumerate(top5['Jumlah']):
        ax1.text(v + 0.3, i, str(v), va='center', fontsize=9)
    plt.tight_layout()
    st.pyplot(fig1)

with col_b:
    st.markdown("**Jenis Kelamin**")
    gender_count = filtered['JENIS_KELAMIN_LABEL'].value_counts()
    fig2, ax2 = plt.subplots(figsize=(3.5, 3.5))
    ax2.pie(gender_count.values, labels=gender_count.index,
            autopct='%1.1f%%', colors=['#4C72B0', '#DD8452'], startangle=90,
            textprops={'fontsize': 9})
    ax2.set_title("Proporsi Gender", fontsize=10)
    plt.tight_layout()
    st.pyplot(fig2)

with col_c:
    st.markdown("**Kelompok Usia**")
    usia_order = ['< 18', '18–39', '40–59', '≥ 60']
    usia_count = filtered['KELOMPOK_USIA'].value_counts().reindex(usia_order).dropna().reset_index()
    usia_count.columns = ['Usia', 'Jumlah']
    fig3, ax3 = plt.subplots(figsize=(3.5, 3.5))
    sns.barplot(data=usia_count, x='Usia', y='Jumlah', ax=ax3, palette='muted')
    ax3.set_title("Distribusi Usia", fontsize=10)
    ax3.set_xlabel("")
    ax3.set_ylabel("Jumlah")
    ax3.tick_params(axis='x', labelsize=8)
    for p in ax3.patches:
        ax3.annotate(int(p.get_height()),
                     (p.get_x() + p.get_width() / 2, p.get_height() + 0.5),
                     ha='center', va='bottom', fontsize=8)
    plt.tight_layout()
    st.pyplot(fig3)

st.markdown("---")

# ── P2 ───────────────────────────────────────────────────────────
st.subheader("Perbandingan Demografis Antar Unit Spesialis")

col_d, col_e, col_f = st.columns(3)

with col_d:
    st.markdown("**Kunjungan per Unit**")
    unit_count = filtered['NM_UNIT_LABEL'].value_counts().reset_index()
    unit_count.columns = ['Unit', 'Jumlah']
    fig4, ax4 = plt.subplots(figsize=(3.5, 3.5))
    sns.barplot(data=unit_count, x='Unit', y='Jumlah', ax=ax4, palette='Set2')
    ax4.set_title("Kunjungan per Unit", fontsize=10)
    ax4.set_xlabel("")
    ax4.set_ylabel("Jumlah Pasien")
    ax4.tick_params(axis='x', labelsize=8)
    for p in ax4.patches:
        ax4.annotate(int(p.get_height()),
                     (p.get_x() + p.get_width() / 2, p.get_height() + 0.5),
                     ha='center', va='bottom', fontsize=8)
    plt.tight_layout()
    st.pyplot(fig4)

with col_e:
    st.markdown("**Gender per Unit**")
    gender_unit = filtered.groupby(['NM_UNIT_LABEL', 'JENIS_KELAMIN_LABEL']).size().unstack(fill_value=0)
    fig5, ax5 = plt.subplots(figsize=(3.5, 3.5))
    gender_unit.plot(kind='bar', ax=ax5, color=['#4C72B0', '#DD8452'])
    ax5.set_title("Gender per Unit", fontsize=10)
    ax5.set_xlabel("")
    ax5.set_ylabel("Jumlah Pasien")
    ax5.tick_params(axis='x', rotation=15, labelsize=8)
    ax5.legend(fontsize=8)
    plt.tight_layout()
    st.pyplot(fig5)

with col_f:
    st.markdown("**Sebaran Usia per Unit**")
    fig6, ax6 = plt.subplots(figsize=(3.5, 3.5))
    sns.boxplot(data=filtered, x='NM_UNIT_LABEL', y='UMUR_TAHUN', ax=ax6, palette='Set2')
    ax6.set_title("Distribusi Usia per Unit", fontsize=10)
    ax6.set_xlabel("")
    ax6.set_ylabel("Usia (Tahun)")
    ax6.tick_params(axis='x', labelsize=8)
    plt.tight_layout()
    st.pyplot(fig6)