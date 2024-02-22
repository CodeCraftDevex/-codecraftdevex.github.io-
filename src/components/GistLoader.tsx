import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface GistLoaderProps {
  gistId: string;
}

const GistLoader: React.FC<GistLoaderProps> = ({ gistId }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/gists/${gistId}`)
      .then((response) => response.json())
      .then((data) => {
        const fileKey = Object.keys(data.files)[0];
        fetch(data.files[fileKey].raw_url)
          .then((response) => response.text())
          .then((rawContent) => {
            setContent(rawContent);
          });
      });
  }, [gistId]);
  const [style, setStyle] = useState({});
  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/material-dark").then(
      (mod) => setStyle(mod.default)
    );
  });
  return (
    <SyntaxHighlighter language="python" style={style}>
      {content}
    </SyntaxHighlighter>
  );
};

export default GistLoader;
