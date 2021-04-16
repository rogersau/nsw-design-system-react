# nsw-ds-react

[![npm version](https://badge.fury.io/js/nsw-ds-react.svg)](https://badge.fury.io/js/nsw-ds-react)

## Install

```bash
npm install --save nsw-ds-react nsw-design-system
```

Add the styles separately in your main `App.js` file

```js
import 'nsw-design-system/dist/css/main.css'
```

In your `index.html` document add this line of code inside the `<head>` tag. Or install [icon](https://www.npmjs.com/package/material-design-icons-iconfont) and [font](https://www.npmjs.com/package/fontsource-montserrat) from npm
```
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Usage

Refer to individual components' usage in [Storybook](https://digitalnsw.github.io/nsw-design-system-react)

Here's how you import the component:
```jsx
import React, { Component } from 'react'

import { Callout } from 'nsw-ds-react'

class Example extends Component {
  render() {
    return (
     <Callout title="Title of callout">
       <p>Description of callout</p>
     </Callout>
    )
  }
}
```

## License

MIT © [digitalnsw](https://github.com/digitalnsw)
