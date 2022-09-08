import React from "react";
import FeatherIcon from 'feather-icons-react';


const Footer = () => {
  return (
    <div>

      <footer className="footer footer-static footer-light">
        <p className="clearfix mb-0">
          <span className="float-md-start d-block d-md-inline-block mt-25">
            COPYRIGHT © 2021
            <a
              className="ms-25 text-info"
              href="https://1.envato.market/pixinvent_portfolio"
              target="_blank"
            >
              Alphanites
            </a>
            <span className="d-none d-sm-inline-block">
              , Pvt Ltd
            </span>
          </span>
          {/* <span className="float-md-end d-none d-md-block">
            Hand-crafted &amp; Made with
            <FeatherIcon icon="heart" />
          </span> */}
        </p>
      </footer>
      <button className="btn btn-primary btn-icon scroll-top" type="button">
        <FeatherIcon icon="arrow-up" />
      </button>

    </div>
  );
};

export default Footer;
