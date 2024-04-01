import { useEffect, useState } from "react";
import "./App.css";

function App() {

  //namnger variabler på ett extremt dåligt och otydligt sätt, bättre hade varit att använda sig av namnen quote, setQuote och author, setAuthor
  const [q, sQ] = useState("");
  const [a, sA] = useState("");
 
  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed networks issue. Please try again later.");
        }
        return response.json();
      })
     
      .then((data) => {
        sQ(data.content);
        sA(data.author);
      })
     
      .catch((error) => {
        //det hade varit bättre att använda console.error än console.log för att göra användaren uppmärksam på att det är ett error.
        console.log("There was a problem with the fetch operation:", error);
        //hade varit bättre att använda exempelvis SetError för tyfligt visa användaren i användargränssnittet att ett error uppstått.
        alert("There was a problem fetching the quote. Please try again later.");
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <header>
        <h1>Quote Generator</h1>
      </header>
      <main>
        <section>
          <p className="italic">"{q}"</p>
        </section>
        <section>
          <p>
            Author: <span>{a}</span>
          </p>
        </section>
        <button onClick={fetchQuote}>Generate new quote</button>
      </main>
      <footer>
        <p>Created by @ElsaBonde</p>
      </footer>
    </>
  );
}

export default App;
