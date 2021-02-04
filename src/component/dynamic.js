import React, { useState } from 'react';
import axios from 'axios';
import '../style/style.css';

function Dynamic() {
  const [input, setinput] = useState('');
  const [disable, setDisable] = useState('disabled');
  const [shorturl, setShorturl] = useState();
  const [copied, setCopied] = useState();
  const [paragraph, setParagraph] = useState(false)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      urlsubmit();
    }
  };

  function validURL(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    let responceValidUrl = !!pattern.test(str);

    const withHttp = (url) =>
      !/^https?:\/\//i.test(url) ? `http://${url}` : url;

    let checkHttpUrl = withHttp(str);
    let inputUrl;
    inputUrl = checkHttpUrl.toString().toLowerCase();
    setinput(inputUrl);

    if (responceValidUrl !== true) {
      setDisable(`disabled`);
    } else {
      setDisable(``);
    }
  }
  function urlsubmit() {
    const options = {
      method: 'POST',
      url: 'https://url-shortener-service.p.rapidapi.com/shorten',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
        'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
      },
      data: { url: `${input}` },
    };

    axios
      .request(options)
      .then(function (response) {
        const { data } = response;
        setShorturl(data.result_url);
        setParagraph(true); //addding the paragraph component
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <div className="Dynamic">
      <input
        type="text"
        id="input-url"
        placeholder="Enter the url.."
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          validURL(e.target.value);
        }}
      />
      <br />
      <button
        id="submit-button"
        disabled={disable}
        type="submit"
        onClick={() => urlsubmit()}>
        Generate
      </button>
      {paragraph === true &&
      <p
        id="short-url"
        onClick={() => {
          if (shorturl !== undefined) {
            navigator.clipboard.writeText(shorturl);
          }
          setCopied(`Copied`);
          setInterval(() => {
            setCopied(``);
          }, 3000);
        }}>
        {shorturl} <i className="far fa-clipboard"></i>
      </p>}
      <p className="copied">{copied}</p>
    </div>
  );
}
export default Dynamic;
