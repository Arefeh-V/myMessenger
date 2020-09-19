import Footer from '../components/messenger/footer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log('state:::::', state)
  return {
    name: state.name
  }
}

const FooterContainer = connect(mapStateToProps)(Footer)

export default FooterContainer
