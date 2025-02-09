import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Meu Workspace
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              {/* Placeholder for Dashboard icon */}
              <span className="icon">📊</span>
              Dashboards
            </Link>
          </li>
          <li>
            <Link to="/agents">
              {/* Placeholder for Agents icon */}
              <span className="icon">🤖</span>
              Agentes
            </Link>
          </li>
          <li>
            <Link to="/chat">
              {/* Placeholder for Chat icon */}
              <span className="icon">💬</span>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/team">
              {/* Placeholder for Team icon */}
              <span className="icon">👥</span>
              Equipe
            </Link>
          </li>
          <li>
            <Link to="/settings">
              {/* Placeholder for Settings icon */}
              <span className="icon">⚙️</span>
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
