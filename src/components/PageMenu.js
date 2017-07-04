import React from 'react';
import { Link } from 'react-router-dom';
import { confirm } from './Modal';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import { css } from 'glamor';
import { success } from '../styles/colors';
import { button } from '../styles/forms';
import { transition } from '../styles/animations';

import { EditIcon, CodeIcon, HamburgerIcon, Download, Trash, Plus, Network } from './Icons';

const styles = {
  menu: css({
    float: 'right',
    paddingTop: 15,

    '& .dropdown': {
      display: 'inline-block',
      position: 'relative'
    },
    '& .dropdown__content': {
      display: 'none',
      position: 'absolute',
      right: '0',
      top: 36,
      minWidth: 250,
      background: 'white',
      border: '1px solid #eee',
      padding: 5,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: 1,

      '& ul': {
        padding: 0,

        '& li': {
          listStyle: 'none',
          margin: 0
        }
      }
    },
    '& .dropdown--active .dropdown__content': {
      display: 'block'
    }
  }),
  switcher: css({
    display: 'inline-block',
    margin: 0,
    padding: 0,

    '& li': {
      display: 'inline-block',

      '& span, & a': {
        display: 'inline-block',
        padding: '5px 10px 3px',
        border: '1px solid #ddd',
        borderRight: 0
      },

      '& span': {
        color: '#999',
        boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)'
      },

      '& a': {
        cursor: 'pointer',
        textDecoration: 'none',
        backgroundImage: 'linear-gradient(to bottom, #fff, #eee)',

        '&:hover, &:focus': {
          backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)',
        }
      },

      '&:nth-child(1)': {
        '& a, & span': {
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5
        }
      },

      '&:nth-last-child(1)': {
        '& span, & a': {
          borderRight: '1px solid #ddd',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5
        }
      }
    }
  }),
  dropdownButton: css(button, {
    textAlign: 'left',
    fontSize: 16,
    padding: '5px 10px 5px 5px',
    marginBottom: 3,
    width: '100%',

    display: 'flex',
    alignItems: 'center',

    whiteSpace: 'nowrap',
    overflow: 'hidden',

    border: '1px solid transparent',
    color: 'inherit',
    textDecoration: 'none',
    backgroundImage: 'none',

    '& svg': {
      display: 'inline-block',
      marginRight: 5,
      transition
    },

    '&:hover, &:focus': {
      background: '#fafafa',
      borderColor: '#ddd',
      textDecoration: 'none',
      color: success,

      '& svg': { stroke: success }
    }
  }),
  dropdownDeleteButton: css({
    '&:hover, &:focus': {
      color: 'red',
      '& svg': { stroke: 'red' }
    }
  }),
  dropdownTrigger: css({
    padding: '5px 7px 3px',
    display: 'inline-block',
    border: '1px solid #ddd',
    borderRadius: 5,
    marginLeft: 10,
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(to bottom, #fff, #eee)',

    '.dropdown--active &': {
      boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
      backgroundImage: 'none',

      '&:hover, &:focus': {
        backgroundImage: 'none'
      }
    },

    '&:hover, &:focus': {
      backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)',
    }
  }),
  dropdownGroup: css({
    marginBottom: 10,

    '&:nth-child(1)': { marginTop: 5 },

    '&:nth-last-child(1)': { marginBottom: 3 },

    '& ul': {
      margin: 0
    }
  })
}

export default ({ network, node, view, handlers }) => {
  let dropdown;

  const closeDropdown = () => dropdown.hide();

  return (
    <div className={styles.menu}>
      {node && (
        <ul className={styles.switcher}>
          <li>
            {view === 'edit'?<span><EditIcon /></span>:<Link to={`/networks/${network.id}/${node.type === 'gateway'?'gateway':node.id}`}><EditIcon /></Link>}
          </li>
          <li>
            {view === 'edit'?<Link to={`/networks/${network.id}/${node.type === 'gateway' ? 'gateway' : node.id}/code`}><CodeIcon /></Link>:<span><CodeIcon /></span>}
          </li>
        </ul>
      )}

      <Dropdown ref={r => dropdown = r}>
        <DropdownTrigger>
          <span className={styles.dropdownTrigger}>
            <HamburgerIcon />
          </span>
        </DropdownTrigger>
        <DropdownContent>
          {node && (
            <fieldset className={styles.dropdownGroup}>
              <legend>Node options</legend>
              <ul>
                <li>
                  <button
                    className={styles.dropdownButton}
                    onClick={e => {
                      closeDropdown();
                      import('../sketch-generator')
                        .then(gen => gen.default({ network, nodeId: node.id }, 'arduino'))
                    }}>
                    <Download />
                    Download this node's code
                  </button>
                </li>
                {node.type !== 'gateway' && (
                  <li>
                    <button
                      className={css(styles.dropdownButton, styles.dropdownDeleteButton)}
                      onClick={() => {
                        closeDropdown();
                        confirm({
                          title: 'Delete this node?',
                          text: 'Are you sure you want to delete this node and all its sensors? You can\'t undo this!',
                          dangerButtonText: 'Yes, delete this node'
                        }).then(handlers.deleteNode)
                      }}>
                      <Trash />
                      Delete this node
                    </button>
                  </li>
                )}
              </ul>
            </fieldset>
          )}

          <fieldset className={styles.dropdownGroup}>
            <legend>Network options</legend>

            <ul className={css({marginBottom: 0})}>
              <li>
                <button
                  className={styles.dropdownButton}
                  onClick={e => {
                    closeDropdown();
                    handlers.addNode(network.id);
                  }}>
                  <Plus />
                  Add a new node to this network
                </button>
              </li>
              <li>
                <Link className={styles.dropdownButton} to='/networks/create'>
                  <Network />
                  Create a new network
                </Link>
              </li>
              <li>
                <button
                  className={css(styles.dropdownButton, styles.dropdownDeleteButton)}
                  onClick={() => {
                    closeDropdown();
                    confirm({
                      title: 'Delete this network?',
                      text: 'Are you sure you want to delete this network and all its nodes and sensors? You can\'t undo this!',
                      dangerButtonText: 'Yes, delete this network'
                    }).then(() => handlers.deleteNetwork(network.id))
                  }}>
                  <Trash />
                  Delete this network
                </button>
              </li>
            </ul>
          </fieldset>
        </DropdownContent>
      </Dropdown>
    </div>
  )
};
