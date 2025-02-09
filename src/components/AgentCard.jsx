import React from 'react';

function AgentCard() {
  return (
    <div className="agent-strip">
      <div className="agent-strip-header">
        <span className="agent-strip-avatar">
          <span className="avatar-icon">🤖</span>
        </span>
        <div className="agent-strip-header-info">
          <h3 className="agent-strip-name">Hortênsia</h3>
          <span className="agent-strip-status active">Ativo</span>
          <p className="agent-strip-description">Vendedor em Mudas para Mudar</p>
        </div>
      </div>
      <div className="agent-strip-options">
        {/* Options icon or button */}
        <button className="agent-strip-options-button">...</button>
      </div>
    </div>
  );
}

export default AgentCard;
