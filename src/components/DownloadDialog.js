import React from 'react';
import { css } from 'glamor';

import generateSketch from '../sketch-generator';

import { Button, LinkButton } from './Buttons';
import IDEFormatPicker from './IDEFormatPicker';
import { hide } from './Modal';

const styles = {
  container: css({
    width: 300,
    minWidth: '90%'
  })
};

export default ({ network, node, format : fmt = 'arduino' }) => {
  let format = fmt;

  const onFormatChange = fmt => { format = fmt; }
  const onButtonClick = e => {
    generateSketch({ network, nodeId: node.id }, format);
    hide();
  }

  return (
    <div className={styles.container}>
      <h1>Download</h1>

      <div className={css({textAlign: 'center'})}>
        <IDEFormatPicker format='arduino' onChange={onFormatChange} />
      </div>

      <footer>
        <LinkButton onClick={hide}>Cancel</LinkButton>
        <Button onClick={onButtonClick}>Download</Button>
      </footer>
    </div>
  )
}