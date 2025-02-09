import React, { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import CreateAgentModal from './CreateAgentModal';
import AgentCard from './AgentCard';

function Dashboard() {
  const { session, supabase } = useSupabase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-agents-header">
        <h1>Agentes</h1>
        <p>Crie, treine e gerencie seus agentes de IA</p>
        <button className="create-agent-button" onClick={openModal}>+ Criar agente</button>
      </div>

      <div className="dashboard-agents-list">
        <AgentCard /> {/* Display AgentCard here */}
        <AgentCard /> {/* Display another AgentCard here for testing */}
        <div className="no-agents" style={{ display: 'none' }}> {/* Hide No Agents message by default */}
          {/* Placeholder for No Agents icon */}
          <span className="no-agents-icon">🤖</span>
          <p>Nenhum agente</p>
          <p>Comece criando seu primeiro agente.</p>
        </div>
      </div>
      <CreateAgentModal isOpen={isModalOpen} onClose={closeModal} />
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
