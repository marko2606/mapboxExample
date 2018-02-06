/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import MapBoxGL from '@mapbox/react-native-mapbox-gl';

MapBoxGL.setAccessToken('pk.eyJ1IjoibWFya28yNjA2IiwiYSI6ImNqZGE0N3o5bDFzNmQyd3FveWFoZDR2a3YifQ.KXi4P0lzDyQuV8534E-vFQ')

export default class App extends Component {
    render() {
        return (
            <MapBoxGL.MapView
                style={ styles.container }
            >

            </MapBoxGL.MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
