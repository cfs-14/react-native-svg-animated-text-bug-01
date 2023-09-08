
# Bug

https://github.com/software-mansion/react-native-svg/issues/2129

When using React Native's Animated library with react-native-svg `Text` component in Android (not sure about iOS), it throws an error/breaks the app:
```java
java.lang.ClassCastException:
java.lang.Double cannot be cast to com.facebook.react.bridge.ReadableArray
```

Tested on a clean project w/ latest versions (as of September 2023) of RN and react-native-svg.

See screenshot and code below for more information (in collapsables).

Please note that other components, like `Rect` do work, but I've had instances where I have to `interpolate(...)` to a string for it to work.

Also in RN Animated it's difficult to cast to other types, so if it could be fixed without casting to another type that would be ideal.

If there is a possible workaround or way I can help, although I'm unfamiliar with the package code, please let me know.

<details>
  <summary>Screenshot of error I receive: (click to expand)</summary>

![react-native-svg text error 01](https://github.com/software-mansion/react-native-svg/assets/19671287/0195afa2-dcc5-43ff-b4ad-63f35776fa7b)

</details>

#### Unexpected behavior


## Environment info

:memo: I do have Android-Sdk installed, not sure why it shows none.

<details>
  <summary>Output from running <code>npx react-native info</code>: (click to expand)</summary>

```bash
System:
  OS: Linux 6.0 Pop!_OS 20.04 LTS
  CPU: (8) x64 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
  Memory: 7.63 GB / 15.48 GB
  Shell:
    version: 5.0.17
    path: /bin/bash
Binaries:
  Node:
    version: 16.20.2
    path: /usr/bin/node
  Yarn: Not Found
  npm:
    version: 8.19.4
    path: /usr/bin/npm
  Watchman: Not Found
SDKs:
  Android SDK: Not Found
IDEs:
  Android Studio: Not Found
Languages:
  Java: Not Found
  Ruby: Not Found
npmPackages:
  "@react-native-community/cli": Not Found
  react:
    installed: 18.2.0
    wanted: 18.2.0
  react-native:
    installed: 0.72.4
    wanted: 0.72.4
npmGlobalPackages:
  "*react-native*": Not Found
Android:
  hermesEnabled: true
  newArchEnabled: false
iOS:
  hermesEnabled: Not found
  newArchEnabled: Not found
```
</details>

:exclamation: Library version: 13.13.0

## Steps To Reproduce

Issues without reproduction steps or code are likely to stall.

1. `git clone https://github.com/cfs-14/react-native-svg-animated-text-bug-01.git`
2. `cd react-native-svg-animated-text-bug-01`
3. `npm start`
6. In a separate terminal: `npm run android`
7. Click on the button to start the animation.
8. Error appears.

Describe what you expected to happen:

1. For the error to not appear and the app to not crash when clicking the button that starts the animation.

## Short, Self Contained, Correct (Compilable), Example

<details>
  <summary>App.tsx (click to expand)</summary>

```javascript
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
          width={ windowDimensions.width }//(windowDimensions.width <= windowDimensions.height) ? windowDimensions.width : (graphMinDimensions.width+MARGIN.HORIZONTAL)}//springAnimatedValues_shared.graphWidth.to(graphWidth => (graphWidth+(MARGIN.HORIZONTAL*2)) ) }//(windowDimensions.width <= windowDimensions.height) ? windowDimensions.width : (springAnimatedValues_shared.graphWidth+MARGIN.HORIZONTAL)}
          height={ SVG_HEIGHT }//(windowDimensions.width <= windowDimensions.height) ? graphMinDimensions.height : windowDimensions.height}//springAnimatedValues_shared.graphHeight.to(graphHeight => (graphHeight+(MARGIN.VERTICAL*2)) )}//(windowDimensions.width <= windowDimensions.height) ? springAnimatedValues_shared.graphDimension : windowDimensions.height}
          viewBox={`0 0 ${ windowDimensions.width } ${ windowDimensions.height }`}//to( [springAnimatedValues_shared.graphWidth, springAnimatedValues_shared.graphHeight], (graphWidth, graphHeight) => `0 0 ${(graphWidth+(MARGIN.HORIZONTAL*2))} ${(graphHeight+(MARGIN.VERTICAL*2))}`)} //`0 0 ${(graphMinDimensions.width+(MARGIN.HORIZONTAL*2))} ${(graphMinDimensions.height+(MARGIN.VERTICAL*2))}`
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
                //y={translate_AV.interpolate({inputRange : [0, SVG_HEIGHT], outputRange : ["0", `${SVG_HEIGHT}`], extrapolate : 'clamp' })}
                textAnchor='middle'
              >
              SOME TEXT
            </AnimatedSvgText>
        </Svg>
        <Button
          title="Animate SVG"
          onPress={translate(translate_AV)}
        />
{
/*      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
*/
}
    </SafeAreaView>
  );
}

export default App;

```
</details>

