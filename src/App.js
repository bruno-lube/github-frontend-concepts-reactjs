import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      if (response.data)
        setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "GoStack Template - NodeJs concepts",
      "url": "https://github.com/rocketseat-education/gostack-template-conceitos-nodejs",
      "techs": ["NodeJs", "Javascript", "Jest"]
    });

    if (response.data) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository({ target }) {
    const id = target.id;
    if (!id) { return }

    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter((repository) => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button id={repository.id} onClick={(event) => handleRemoveRepository(event)}>
              Remover
          </button>
          </li>)
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
