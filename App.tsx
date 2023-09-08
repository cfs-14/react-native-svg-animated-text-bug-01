/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{ useRef, useState, useMemo, useEffect, useLayoutEffect } from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text as RnText,
  useColorScheme,
  View,
  Animated,
  PanResponder,
  TextInput,
  useWindowDimensions,
  Platform,
  Button,
} from 'react-native';

import { Svg, Rect, Text as SvgText, TSpan, G, Defs, } from 'react-native-svg';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);


function App(): JSX.Element {

  const windowDimensions = { height : (useWindowDimensions().height-((Platform.OS === 'android') ? StatusBar.currentHeight : 0)), width : useWindowDimensions().width };

  const BUTTON_HEIGHT = 100;
  const SVG_HEIGHT = (windowDimensions.height - BUTTON_HEIGHT);

  const translate_AV = useRef(new Animated.Value(SVG_HEIGHT/2.0)).current;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const translate = (av) => {
    return () => {
      Animated.timing(av,
        {
          toValue: Animated.add(av, new Animated.Value(30)),
          duration : 100,
          useNativeDriver : true
        }
      )
      .start()
    }
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, flex: 1, padding: 0, margin: 0}}>
        <Svg
          width={ windowDimensions.width }
          height={ SVG_HEIGHT }
          viewBox={`0 0 ${ windowDimensions.width } ${ windowDimensions.height }`}
          style={{ padding: 0, margin: 0 }}
        >
          <AnimatedSvgText
                fill='black'
                stroke='none'
                fontSize={20}
                fontWeight='bold' //(p)(bug) RNSVG G NMAshn
                x={windowDimensions.width/2.0}
                //Doesn't work
                y={translate_AV}
                //Doesn't work
                // y={[translate_AV]}
                //Doesn't work
                // y={translate_AV.interpolate({inputRange : [0, SVG_HEIGHT], outputRange : ["0", `${SVG_HEIGHT}`], extrapolate : 'clamp' })}
                textAnchor='middle'
              >
              SOME TEXT
            </AnimatedSvgText>
        </Svg>
        <Button
          title="Animate SVG"
          onPress={translate(translate_AV)}
        />
    </SafeAreaView>
  );
}

export default App;
