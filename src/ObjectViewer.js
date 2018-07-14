import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ObjectViewer.css';

class ObjectViewer extends PureComponent {
  static propTypes = {
    obj: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handleExpandClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    return (
      <div className="object-viewer">
        <div className="object-viewer__header">
          <div className="object-viewer__name">{this.props.name}</div>
          {this.props.obj &&
            <button
              type="button"
              onClick={this.handleExpandClick}>
              {this.state.expanded ? 'Hide' : 'Show'}
            </button>
          }
        </div>
        {this.props.obj &&
          <pre className={`object-viewer__object ${!this.state.expanded ? 'is-hidden' : ''}`}>
            {JSON.stringify(this.props.obj, undefined, 2)}
          </pre>
          ||
          <div>Drag {this.props.name} to the box above to see file contents.</div>
        }
      </div>
    );
  }
}

export default ObjectViewer;
