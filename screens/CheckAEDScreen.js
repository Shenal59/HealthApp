import React, { useState, useEffect } from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';


const { width, height } = Dimensions.get('window');
 const ASPECT_RATIO = width / height;
 const LATITUDE_DELTA = 0.005;
 const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const data = require('../data/real.json');
const length = 9282;
let id = 0;
let markers = [];

function getInfo(name, word){
    let pos1 = word.search(name);
    let a = word.slice(pos1, word.length);
    let pos2 = a.search('<td>');
    let pos3 = a.search('</td>');
    result = a.slice(pos2+4,pos3);
    return result;
}

// Read all AED markers 
function generateMarkers(currentLocation, radius) {
  const result = [];
  for (let i = 0; i < data.features.length; i+=1) {
    const coordinates = data.features[i].geometry.coordinates;
    const distance = haversine(currentLocation.latitude, currentLocation.longitude, coordinates[1], coordinates[0]);
    if (distance <= radius) {
      const word = data.features[i].properties.Description;
      AEDLocationDescription = getInfo('AED_LOCATION_DESCRIPTION', word);
      operatingHours = getInfo('OPERATING_HOURS', word);
      houseNo = getInfo('HOUSE_NUMBER', word);
      roadName = getInfo('ROAD_NAME', word);
      postalCode = getInfo('POSTAL_CODE', word);
      AEDdescription = houseNo + ' ' + roadName + ', ' + postalCode + ', ' + operatingHours.slice(0, -1) + ', ' + AEDLocationDescription;
      const newMarker = {
        coordinate: {
          latitude: coordinates[1],
          longitude: coordinates[0],
        },
        key: id++,
        description: AEDdescription,
      };
      result.push(newMarker);
    }
  }
  console.log("Markers are ",result)
  return result;
}

// function generateMarkers() {
//   const result = [];
//   for (let i = 0; i < length; i+=30) {     // the density of the marker
//     const word = data.features[i].properties.Description;
//     AEDLocationDescription = getInfo('AED_LOCATION_DESCRIPTION', word);
//     operatingHours = getInfo('OPERATING_HOURS', word);
//     houseNo = getInfo('HOUSE_NUMBER', word);
//     roadName = getInfo('ROAD_NAME', word);
//     postalCode = getInfo('POSTAL_CODE', word);
//     AEDdescription = houseNo + ' ' + roadName + ', ' + postalCode + ', ' + operatingHours.slice(0, -1) + ', ' + AEDLocationDescription;
//     const coordinates = data.features[i].geometry.coordinates;
//     const newMarker = {
//       coordinate: {
//         latitude: coordinates[1],
//         longitude: coordinates[0],
//       },
//       key: id++,
//       description: AEDdescription,
//     };
//     result.push(newMarker);
//   }
//   return result;
// }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


export default function CheckAEDScreen (){
  // Ask permission to access user's location
  const askLocationPermission = async () => {
      if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
              title: 'Example App ACCESS_FINE_LOCATION Permission',
              message: 'Example App needs access to your ACCESS_FINE_LOCATION',
              },
          );
          console.log(granted);
      }
  }

  askLocationPermission();

  // Get user's location
  const [userCoord, setUserCoord] = useState({"latitude":1.3461 , "longitude": 103.6826});

  useEffect(() => {      
    Geolocation.getCurrentPosition( 
      (position) => { 
          var coord = {"latitude": 1.3461, "longitude": 103.6826};
          setUserCoord(coord);
          console.log("*");
      }
    )
  }, []);

  const state = {
    region: {
      latitude: 1.3461,
      longitude: 103.6826,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    },
  };

  markers = generateMarkers(userCoord,0.7);

  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       style={styles.map}
  //       initialRegion={state.region}
  //       provider={PROVIDER_GOOGLE}
  //     >
  //       {/* {markers.map(marker => (
  //         <MapView.Marker coordinate={marker.coordinate}
  //         key={marker.key}>
  //           <MapView.Callout>
  //             <View style={{height: 100, width: 200}}>
  //               <Text> {marker.description} </Text>
  //             </View>
  //           </MapView.Callout>
  //         </MapView.Marker>
  //       ))} */}
  //     </MapView>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={state.region}
      >
        {markers.map(marker => (
          <Marker coordinate={marker.coordinate}
          key={marker.key}>
            <Callout>
              <View style={{height: 100, width: 200}}>
                <Text style = {styles.name}> {marker.description} </Text>
              </View>
            </Callout>
          </Marker>
        ))}
          <Marker coordinate={{
            longitude: 103.6826,
            latitude: 1.3461,
          }}
          pinColor='blue'>
            <Callout tooltip>
              <View>
                <View style = {styles.bubble}>
                  <Text style = {styles.name}>
                    You are here
                  </Text>
                </View>
                <View style={styles.arrowBorder}/>
                <View style={styles.arrow}/>
              </View>
            </Callout>
          </Marker>
      </MapView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 5,
    padding: 5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth:16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth:16,
    alignSelf: 'center',
    marginTop: -0.5,
  }
 });

// const styles = StyleSheet.create({
//   container: {
//       //justifyContent: 'flex-end',
//       alignItems: 'center',
//   },
//   scrollview: {
//       alignItems: 'center',
//       //paddingVertical: 40,
//   },
//   map: {
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height,
//       flex: 1,
//   },
// });

module.exports = CheckAEDScreen;
  