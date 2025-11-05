import React from 'react';

export default {
  title: 'Introduction/Getting Started',
};

export const GettingStarted: React.FC = () => {
  return (
    <div>
      <style>{`
  .subheading {
    --mediumdark: '#999999';
    font-weight: 900;
    font-size: 13px;
    color: #999;
    letter-spacing: 6px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .link-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
  }

  @media (min-width: 620px) {
    .link-list {
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media all and (-ms-high-contrast:none) {
  .link-list {
      display: -ms-grid;
      -ms-grid-columns: 1fr 1fr;
      -ms-grid-rows: 1fr 1fr;
    }
  }

  .link-item {
    display: block;
    padding: 20px 30px 20px 15px;
    border: 1px solid #00000010;
    border-radius: 5px;
    transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
    color: #333333;
    display: flex;
    align-items: flex-start;
  }

  .link-item:hover {
    border-color: #1EA7FD50;
    transform: translate3d(0, -3px, 0);
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }

  .link-item:active {
    border-color: #1EA7FD;
    transform: translate3d(0, 0, 0);
  }

  .link-item strong {
    font-weight: 700;
    display: block;
    margin-bottom: 2px;
  }

  .link-item img {
    height: 40px;
    width: 40px;
    margin-right: 15px;
    flex: none;
  }

  .link-item span {
    font-size: 14px;
    line-height: 20px;
  }

  .tip {
    display: inline-block;
    border-radius: 1em;
    font-size: 11px;
    line-height: 12px;
    font-weight: 700;
    background: #E7FDD8;
    color: #66BF3C;
    padding: 4px 12px;
    margin-right: 10px;
    vertical-align: top;
  }

  .tip-wrapper {
    font-size: 13px;
    line-height: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .tip-wrapper code {
    font-size: 12px;
    display: inline-block;
  }

`}</style>

      <h1>NSW DS React Components Library</h1>

      <p>
        The NSW Design System React is built on top of the base NSW design system. The
        library reuses existing vanilla js and css implementation rewritten in JSX. NSW
        DS React provides the exact same UI design, accessibility features and
        cross-browser compatibility of the base library.
      </p>

      <p>
        Storybook helps you build UI components in isolation from your app's business
        logic, data, and context. That makes it easy to develop hard-to-reach states.
        This also gives an easy documentation to install and to use the library.
      </p>

      <h2>Install</h2>

      <pre>
        <code>{`npm install nsw-ds-react nsw-design-system`}</code>
      </pre>

      <h3>Add the styles</h3>
      <p>
        Add the styles separately in your main <code>App.js</code> file
      </p>

      <pre>
        <code>{`import 'nsw-design-system/dist/css/main.css'`}</code>
      </pre>

      <h3>Icons & fonts</h3>
      <p>In your <code>index.html</code> document add this line of code inside the &lt;head&gt; tag. Or install the icon and font packages from npm.</p>

      <pre>
        <code>{`<link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`}</code>
      </pre>

      <h2>Usage</h2>

      <p>Refer to individual components usage</p>

      <p>Here's how you import the component:</p>

      <pre>
        <code>{`import React, { Component } from 'react'

import { Callout } from 'nsw-ds-react'

class Example extends Component {
  render() {
    return (
     <Callout title="Title of callout">
       <p>Description of callout</p>
     </Callout>
    )
  }
}`}</code>
      </pre>

    </div>
  );
};

(GettingStarted as any).storyName = 'Introduction / Getting Started';
