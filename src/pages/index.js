import React from 'react'
import Layout from '../components/layout'

import Header from '../components/header'
import Main from '../components/main'
import Footer from '../components/footer'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: 'is-loading'
    }
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <div className={`body ${this.state.loading}`}>
          <div id="wrapper">
            <Header />
            <Main />
            <Footer timeout={this.state.timeout} />
          </div>
          <div id="bg"></div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage;
