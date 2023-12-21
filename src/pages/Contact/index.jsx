import './style.scss';

function Contact({ socialMedias = [] }) {
    return (
      <div id="contact">
        <div className="infos">
          {socialMedias.map(media => <button key={media.name}>{media.name}</button>)}
          <a href="tel:5511989186251">+55 11 9 8918-6251</a>
          <a href="mailto:vhrita.dev@gmail.com">vhrita.dev@gmail.com</a>
        </div>
        <form></form>
      </div>
    );
}

export default Contact;