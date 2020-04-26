import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("repositories").then(({ data: repositories}) => {
      setRepositories(repositories)
    })
  }, [])

  async function handleAddRepository() {
    const { data: repository } = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });
    setRepositories([...repositories, repository ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const updatedRepositories = repositories.filter(repository => (repository.id !== id))
    setRepositories(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            <b>Título: </b> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
