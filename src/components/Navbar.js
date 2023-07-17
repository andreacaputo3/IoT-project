import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fminecraft-hero%2Fimages%2F5%2F58%2FVillager.png%2Frevision%2Flatest%2Fthumbnail%2Fwidth%2F360%2Fheight%2F360%3Fcb%3D20180404130845&tbnid=iAY8VGfeEqLALM&vet=12ahUKEwj7mpzE-pCAAxWECewKHV4XCNcQMygBegUIARDVAQ..i&imgrefurl=https%3A%2F%2Fminecraft-hero.fandom.com%2Fwiki%2FVillagers&docid=nnFuSyS0OPTteM&w=192&h=360&q=minecraft%20villager&ved=2ahUKEwj7mpzE-pCAAxWECewKHV4XCNcQMygBegUIARDVAQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trasporti
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;