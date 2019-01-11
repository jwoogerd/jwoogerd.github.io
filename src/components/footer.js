import React from 'react'
import PropTypes from 'prop-types'

const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
        <p className="copyright">&copy; Jayme Woogerd 2019. Design heavily influenced by <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a> (thanks!).</p>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer
