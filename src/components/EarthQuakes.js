import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

import sheet from '../styles/sheet';
import { SF_OFFICE_COORDINATE } from '../utils';
import { data } from '../data';

const layerStyles = MapboxGL.StyleSheet.create({
    singlePoint: {
        circleColor: 'green',
        circleOpacity: 0.84,
        circleStrokeWidth: 2,
        circleStrokeColor: 'white',
        circleRadius: 5,
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map
    },

    clusteredPoints: {
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map,
        circleColor: MapboxGL.StyleSheet.source([
            [25, 'yellow'],
            [50, 'red'],
            [75, 'blue'],
            [100, 'orange'],
            [300, 'pink'],
            [750, 'white']
        ], 'point_count', MapboxGL.InterpolationMode.Exponential),

        circleRadius: MapboxGL.StyleSheet.source([
            [0, 15],
            [100, 20],
            [750, 30]
        ], 'point_count', MapboxGL.InterpolationMode.Exponential),

        circleOpacity: 0.84,
        circleStrokeWidth: 2,
        circleStrokeColor: 'white'
    },

    clusterCount: {
        textField: '{point_count}',
        textSize: 12,
        textPitchAlignment: MapboxGL.TextPitchAlignment.Map
    }
});

import exampleIcon from '../assets/ic_ship_laden.png';

const styles = MapboxGL.StyleSheet.create({
    icon: {
        iconImage: exampleIcon,
        iconAllowOverlap: true,
        iconSize: 1,
        iconRotate: 90
    }
});

class EarthQuakes extends React.Component {
    static propTypes = {
        ...BaseExamplePropTypes
    };

    state = {
        geoJSON: null
    };

    componentWillMount() {
        this.createGeoJSON(data)
    }

    createGeoJSON(data) {
        const geoJSON = {
            type: 'FeatureCollection',
            features: []
        };

        geoJSON.features = data.Entries.map(item => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        item.Entries[0].Location.Longitude,
                        item.Entries[0].Location.Latitude
                    ]
                }
            }
        });
        console.log(geoJSON);
        this.setState({ geoJSON })
    }

    render() {
        if (!this.state.geoJSON) {
            return false;
        }
        return (
            <Page { ...this.props }>
                <MapboxGL.MapView
                    zoomLevel={ 6 }
                    pitch={ 45 }
                    centerCoordinate={ SF_OFFICE_COORDINATE }
                    style={ sheet.matchParent }
                    styleURL={ MapboxGL.StyleURL.Dark }>

                    <MapboxGL.ShapeSource
                        id='earthquakes'
                        onPress={ (e) => console.log('can\'t touch this   =', e.nativeEvent) }
                        shape={ this.state.geoJSON }
                    >
                        <MapboxGL.SymbolLayer
                            id='symbolLocationSymbols'
                            style={ styles.icon }
                        />
                    </MapboxGL.ShapeSource>
                </MapboxGL.MapView>
            </Page>
        );
    }
}

export default EarthQuakes;
