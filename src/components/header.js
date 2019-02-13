import React from 'react'

import resume from '../assets/jayme_woogerd_resume.pdf';

const taglines = [
  'Washed up athlete',
  'Bit Enthusiast',
  'Minimalist',
  'Tiny house lover',
  'bobby orr fan',
  'Retired dog jogger',  //https://www.youtube.com/watch?v=KwuHuMkJGRQ&feature=youtu.be
];

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      tagline: taglines[0],
      change: false,
    }
  }

  changeTagline = () => {
    const index = (this.state.index + 1) % taglines.length;
    setTimeout(() => this.setState({ change: false, tagline: taglines[index], index }), 300);
    return this.setState({ change: true });
  };

  componentDidMount() {
    setInterval(() => this.changeTagline(), 6000);
  }

  render() {
    const classes = this.state.change ? 'tagline change' : 'tagline';
    return (
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>Jayme Woogerd</h1>
            <h3>
              <span className={classes}>Software Engineer | {`${this.state.tagline}`}</span>
            </h3>
            <ul className="icons">
              <li>
                <a href="mailto:jwoogerd@gmail.com" className="icon fa-envelope-open">
                  <span className="label">Email</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/jwoogerd" rel="noopener noreferrer" target="_blank" className="icon fa-github">
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jayme-woogerd/" rel="noopener noreferrer" target="_blank" className="icon fa-linkedin">
                  <span className="label">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={resume} rel="noopener noreferrer" type="application/pdf" target="_blank" className="icon fa-file-pdf-o">
                  <span className="label">Resume</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
