import { useEffect, useState } from "react";
import "./App.css";

function App() {

  //Namnger variabler på ett extremt dåligt och otydligt sätt, bättre hade varit att använda sig av namnen quote, setQuote och author, setAuthor
  const [q, sQ] = useState("");
  const [a, sA] = useState("");
 
  //Dåligt namn på funktion, bättre hade varit att använda sig av något mer beskrivande som fetchQuote, fetchRandomQuote eller liknande. Dessutom är namnet felaktigt skrivet, det ska vara retrieveData (camelCase) för att hålla koden konsekvent och öka läsbarheten.
  const RetriveData = () => {
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
        //Det hade varit bättre att använda console.error än console.log för att göra användaren uppmärksam på att det är ett error.
        console.log("There was a problem with the fetch operation:", error);
        //Hade varit bättre att använda exempelvis SetError för tyfligt visa användaren i användargränssnittet att ett error uppstått.
        alert("There was a problem fetching the quote. Please try again later.");
      });
  };

  useEffect(() => {
    RetriveData();
  }, []);

  return (
    <>
      <header>
        <h1>Quote Generator</h1>
      </header>
      <main>
        <section>
          <p>"{q}"</p>
        </section>
        <section>
          <p>
            Author: <span>{a}</span>
          </p>
        </section>
        <button onClick={RetriveData}>Generate new quote</button>
      </main>
      <footer>
        <p>Created by @ElsaBonde</p>
      </footer>
    </>
  );
}

export default App;
