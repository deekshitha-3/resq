import streamlit as st

st.set_page_config(page_title='Flood', page_icon='🌊', initial_sidebar_state='expanded')
st.title("Floods Masking and Segmentation Model 🌊")
st.divider()
st.subheader("Results")
st.markdown("**Accuracy of our model:** 92%")
st.image('./assets/output_flood_segmentation.png')
st.divider()
st.subheader("**How or model detect floods using satellite imagery?**")
st.markdown("AI techniques are applied for data analysis and decision support, including semantic segmentation of satellite imagery,and optimization of resource allocation. These algorithms provide actionable insights to emergency responders and relief agencies, aiding in strategic planning and response coordination.")