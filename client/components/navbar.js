import React, { Component } from "react";
import PropTypes from "prop-types";
import { replaceComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Tags } from "/lib/collections";

class MyNavBar extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object)
  }

  renderTags() {
    if (Array.isArray(this.props.tags)) {
      return this.props.tags.map((tag) => {
        return (
          <a
            href={`/tags/${tag.slug}`}
            key={tag._id}
          >
            {tag.name}
          </a>
        );
      });
    }
  }

  render() {
    return (
      <div className="my-navbar">
        {this.renderTags()}
      </div>
    );
  }
}

// Create a function to get data from Meteor, reactive data sources just as mini-mongo
const composer = (props, onData) => {
  // First level of recursive tag tree get
  const tags = Tags.find(
    { isTopLevel: true },
    { sort: { position: 1 } }
  ).fetch();

  onData(null, { tags });
};

// Replace the default navigation bar with MyNavBar
replaceComponent("NavBar", MyNavBar, composeWithTracker(composer, false));

export default MyNavBar;
