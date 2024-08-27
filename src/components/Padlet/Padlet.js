import React from 'react';

const PadletEmbed = () => {
  const padletEmbedCode = `
    <div class="padlet-embed" style="border:1px solid rgba(0,0,0,0.1);border-radius:2px;box-sizing:border-box;overflow:hidden;position:relative;width:100%;background:#F4F4F4">
      <p style="padding:0;margin:0">
        <iframe
          src="https://padlet.com/embed/pcxkh53ez31p50z5"
          frameborder="0"
          allow="fullscreen;camera;microphone;geolocation"
          style="width:100%;height:608px;display:block;padding:0;margin:0"
        ></iframe>
      </p>
      <div style="display:flex;align-items:center;justify-content:end;margin:0;height:28px">
        <a href="https://padlet.com?ref=embed" style="display:block;flex-grow:0;margin:0;border:none;padding:0;text-decoration:none" target="_blank" rel="noopener noreferrer">
          <div style="display:flex;align-items:center;">
            <img src="https://padlet.net/embeds/made_with_padlet_2022.png" width="114" height="28" style="padding:0;margin:0;background:0 0;border:none;box-shadow:none" alt="Made with Padlet">
          </div>
        </a>
      </div>
    </div>
  `;

  return (
    <div>
      <h2>Collaborative Board</h2>
      <div dangerouslySetInnerHTML={{ __html: padletEmbedCode }} />
    </div>
  );
};

export default PadletEmbed;