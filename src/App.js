import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Desafio ReactJS",
      techs: ["Node", "Express", "TypeScript"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete("repositories/"+id)
      .then(() => {
        var repos = [...repositories];
        for(var i = 0; i < repos.length; i++){
          if(repos[i].id === id){
            repos.splice(i, 1);
            setRepositories(repos);
            break;
          }
        }
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
            <li key={repo.id}>
              {repo.title}
    
              <button onClick={() => handleRemoveRepository(repo.id)}>
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
