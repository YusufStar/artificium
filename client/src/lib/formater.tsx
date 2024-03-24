export const messageNormalize = (message: string) => {
  const cols = message.split("\n");
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const tagRegex = /@(\w+)/g;

  return cols
    .map((col, idx) => {
      if (col === "") {
        return <br key={idx} />;
      } else {
        return col.split(" ").map((word, wordIdx) => {
          if (linkRegex.test(word)) {
            return (
              <a
                className="text-blue-500"
                key={idx + "-" + wordIdx}
                href={word}
                target="_blank"
                rel="noreferrer"
              >
                {word.replace(/(^\w+:|^)\/\//, "")}
              </a>
            );
          } else {
            const matches = word.match(tagRegex);
            if (matches) {
              return (
                <span key={idx + "-" + wordIdx}>
                  {matches.map((match, index) => (
                    <a
                      href={`/profile/${match.replace("@", "")}`}
                      className="text-stemGreen-500"
                      key={idx + "-" + wordIdx + "-" + index}
                    >
                      {match}
                    </a>
                  ))}
                </span>
              );
            } else {
              return <span key={idx + "-" + wordIdx}>{word}</span>;
            }
          }
        });
      }
    })
    .map((col, idx) => (
      <div key={idx} className="flex gap-1">
        {col}
      </div>
    ));
};
