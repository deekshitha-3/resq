import streamlit as st

st.set_page_config(page_title='WildFire', page_icon='👨‍🚒', initial_sidebar_state='expanded')
st.title("Detect Early Wildfires 👨‍🚒")
st.markdown("The solution utilizes satellite imagery, particularly NOAA-20 satellites called VIIRS, for detection of Wildfires in early stages so that Disaster Relief teams can be sent the information before, expeding Disaster Relief.")
st.divider()
st.subheader("Results")
st.markdown("**Accuracy of our model:** 94.23%")
st.image('./assets/results.png')

st.divider()
st.subheader("How our model detect wildfires using satellite imagery?")
st.markdown("Using Deep Learning models (CNN) we can detect Wildfires from satellite Images as the model learns the changes in vegetation density and area landscape")


