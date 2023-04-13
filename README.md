# HealthApp
Health App designed to save lives in an emergency situation

Features:
1. Uses Government API of AED locations in sync with the user's current location via Geolocation to show AED's in a 700m radius around the user
2. Emergency Button feature to play a loud alarm sound on user's phone to alert people nearby to the emergency. Also sends an SMS to precoded number which will be the emergency service along with user defined emergency contacts. This message contains the user's current locations and informs of the emergency.
3. Provide guides on how to act in certain medical situations ranging from simple sprains to gunshot wounds, along with AED and CPR guides.
4. User data such as medical info is stored using Firebase Realtime Database as backend, for medical personnel to view on the spot in the case the user is not responding
