import React, { useState } from 'react';

function CreateAgentModal({ isOpen, onClose }) {
  const [selectedSection, setSelectedSection] = useState('personalInfo');
  const [agentName, setAgentName] = useState('');
  const [agentRole, setAgentRole] = useState('');
  const [llmProvider, setLlmProvider] = useState('');
  const [llmModel, setLlmModel] = useState(''); // Novo estado para o modelo LLM
  const [apiKey, setApiKey] = useState('');
  const [timezone, setTimezone] = useState('UTC-3');
  const [useCurrentDateTime, setUseCurrentDateTime] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState('');

  const llmModels = {
    openai: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview'],
    gemini: ['gemini-pro', 'gemini-ultra'],
    claude: ['claude-2', 'claude-instant-1'],
    groq: ['llama2-70b-4096'],
    openrouter: ['openai/gpt-3.5-turbo', 'anthropic/claude-2'],
    ollama: ['llama2', 'mistral'],
  };

  if (!isOpen) return null;

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleSaveApiKey = () => {
    console.log('API Key Salva:', apiKey);
    // Aqui você pode adicionar a lógica para salvar a API Key para o agente
    alert('API Key Salva!'); // Feedback simples para o usuário
  };

  const handleSaveAgent = () => {
    const agentData = {
      name: agentName,
      role: agentRole,
      llm: llmProvider,
      llmModel: llmModel, // Incluindo o modelo LLM nos dados do agente
      apiKey: apiKey,
      timezone: timezone,
      useCurrentDateTime: useCurrentDateTime,
      systemPrompt: systemPrompt,
      intents: [], // placeholder
      rag: {},     // placeholder
      integrations: { // placeholder
        elevenLabs: false,
        googleSheets: false,
        googleCalendar: false,
        gmail: false,
        duckDuckGo: false,
        serper: false,
      },
    };
    console.log('Agente Salvo:', agentData);
    // Aqui você adicionaria a lógica para salvar os dados do agente (ex: enviar para o backend)
    alert('Agente Salvo!'); // Feedback simples para o usuário
    onClose(); // Fechar o modal após salvar
  };

  const handleDateTimeToggle = (e) => {
    setUseCurrentDateTime(e.target.checked);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Criar Novo Agente</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-sidebar">
            <ul>
              <li
                className={selectedSection === 'personalInfo' ? 'selected' : ''}
                onClick={() => handleSectionClick('personalInfo')}
              >
                <span className="modal-icon">👤</span>
                Pessoal
              </li>
              <li
                className={selectedSection === 'config' ? 'selected' : ''}
                onClick={() => handleSectionClick('config')}
              >
                <span className="modal-icon">⚙️</span>
                Configurações
              </li>
              <li
                className={selectedSection === 'work' ? 'selected' : ''}
                onClick={() => handleSectionClick('work')}
              >
                <span className="modal-icon">💼</span>
                Trabalho
              </li>
              <li
                className={selectedSection === 'training' ? 'selected' : ''}
                onClick={() => handleSectionClick('training')}
              >
                <span className="modal-icon">🎓</span>
                Treinamento
              </li>
              <li
                className={selectedSection === 'intents' ? 'selected' : ''}
                onClick={() => handleSectionClick('intents')}
              >
                <span className="modal-icon">🎯</span>
                Intenções
              </li>
              <li
                className={selectedSection === 'integrations' ? 'selected' : ''}
                onClick={() => handleSectionClick('integrations')}
              >
                <span className="modal-icon">🔗</span>
                Integrações
              </li>
              <li
                className={selectedSection === 'channels' ? 'selected' : ''}
                onClick={() => handleSectionClick('channels')}
              >
                <span className="modal-icon">📢</span>
                Canais
              </li>
            </ul>
          </div>
          <div className="modal-main">
            {selectedSection === 'personalInfo' && (
              <div>
                <div className="agent-info">
                  <div className="agent-avatar">
                    <span className="avatar-icon">🤖</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="agent-name-input"
                      placeholder="Nome do Agente"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="agent-role-input"
                      placeholder="Função do Agente (opcional)"
                      value={agentRole}
                      onChange={(e) => setAgentRole(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedSection === 'config' && (
              <div>
                <h3>Configurações do Agente</h3>
                <div className="form-group">
                  <label htmlFor="llmProvider">Provedor de LLM</label>
                  <select id="llmProvider" value={llmProvider} onChange={(e) => setLlmProvider(e.target.value)}>
                    <option value="">Selecione um provedor</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                    <option value="claude">Claude</option>
                    <option value="groq">Groq</option>
                    <option value="openrouter">OpenRouter</option>
                    <option value="ollama">Ollama</option>
                  </select>
                </div>
                {llmProvider && (
                  <div className="form-group">
                    <label htmlFor="llmModel">Modelo de LLM</label>
                    <select id="llmModel" value={llmModel} onChange={(e) => setLlmModel(e.target.value)}>
                      <option value="">Selecione um modelo</option>
                      {llmModels[llmProvider]?.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="apiKey">API Key</label>
                  <input
                    type="text"
                    id="apiKey"
                    placeholder="Insira sua API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <button className="save-api-key-button" onClick={handleSaveApiKey}>Salvar API Key</button>
                </div>
                 <div className="form-group">
                  <label htmlFor="systemPrompt">System Prompt</label>
                  <textarea
                    id="systemPrompt"
                    placeholder="Insira o System Prompt do Agente"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timezone">Timezone do Agente</label>
                  <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} defaultValue="UTC-3">
                    <option value="UTC-12">(UTC-12:00) International Date Line West</option>
                    <option value="UTC-11">(UTC-11:00) Niue, Samoa</option>
                    <option value="UTC-10">(UTC-10:00) Hawaii-Aleutian Standard Time, Cook Islands, Tahiti</option>
                    <option value="UTC-9:30">(UTC-09:30) Marquesas Islands</option>
                    <option value="UTC-9">(UTC-09:00) Alaska Standard Time, Gambier Islands</option>
                    <option value="UTC-8">(UTC-08:00) Pacific Standard Time, Clipperton Island</option>
                    <option value="UTC-7">(UTC-07:00) Mountain Standard Time</option>
                    <option value="UTC-6">(UTC-06:00) Central Standard Time</option>
                    <option value="UTC-5">(UTC-05:00) Eastern Standard Time, Colombia, Ecuador, Peru</option>
                    <option value="UTC-4">(UTC-04:00) Atlantic Standard Time, Bolivia, Venezuela</option>
                    <option value="UTC-3:30">(UTC-03:30) Newfoundland Standard Time</option>
                    <option value="UTC-3">(UTC-03:00) Sao Paulo, Eastern Greenland</option>
                    <option value="UTC-2">(UTC-02:00) South Georgia and the South Sandwich Islands</option>
                    <option value="UTC-1">(UTC-01:00) Azores, Cape Verde Time</option>
                    <option value="UTC+0">(UTC+00:00) Greenwich Mean Time, Western European Time</option>
                    <option value="UTC+1">(UTC+01:00) Central European Time</option>
                    <option value="UTC+2">(UTC+02:00) Eastern European Time, Kaliningrad Time</option>
                    <option value="UTC+3">(UTC+03:00) Moscow Time, East Africa Time</option>
                    <option value="UTC+3:30">(UTC+03:30) Iran Standard Time</option>
                    <option value="UTC+4">(UTC+04:00) Samara Time</option>
                    <option value="UTC+4:30">(UTC+04:30) Afghanistan Time</option>
                    <option value="UTC+5">(UTC+05:00) Pakistan Standard Time, Yekaterinburg Time</option>
                    <option value="UTC+5:30">(UTC+05:30) Indian Standard Time, Sri Lanka Time</option>
                    <option value="UTC+5:45">(UTC+05:45) Nepal Time</option>
                    <option value="UTC+6">(UTC+06:00) Bangladesh Time, Bhutan Time, Omsk Time</option>
                    <option value="UTC+6:30">(UTC+06:30) Cocos Islands, Myanmar Time</option>
                    <option value="UTC+7">(UTC+07:00) Krasnoyarsk Time, Cambodia, Laos, Thailand, Vietnam</option>
                    <option value="UTC+8">(UTC+08:00) China Standard Time, Australian Western Standard Time</option>
                    <option value="UTC+8:45">(UTC+08:45) Southeastern Islands</option>
                    <option value="UTC+9">(UTC+09:00) Japan Standard Time, Korea Standard Time, Irkutsk Time</option>
                    <option value="UTC+9:30">(UTC+09:30) Australian Central Standard Time</option>
                    <option value="UTC+10">(UTC+10:00) Australian Eastern Standard Time, Vladivostok Time</option>
                    <option value="UTC+10:30">(UTC+10:30) Lord Howe Island</option>
                    <option value="UTC+11">(UTC+11:00) Solomon Islands, Magadan Time, Norfolk Island</option>
                    <option value="UTC+11:30">(UTC+11:30) New Caledonia, Sakhalin Time</option>
                    <option value="UTC+12">(UTC+12:00) New Zealand Standard Time, Fiji Time, Kamchatka Time</option>
                    <option value="UTC+12:45">(UTC+12:45) Chatham Islands Standard Time</option>
                    <option value="UTC+13">(UTC+13:00) Tonga, Phoenix Islands Time</option>
                    <option value="UTC+14">(UTC+14:00) Line Islands</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="useCurrentDateTime">Acesso à Data/Hora Atual</label>
                  <input
                    type="checkbox"
                    id="useCurrentDateTime"
                    checked={useCurrentDateTime}
                    onChange={handleDateTimeToggle}
                  />
                </div>
              </div>
            )}

            {selectedSection === 'work' && (
              <div>
                <h3>Informações de Trabalho</h3>
                <p>Conteúdo da seção de Trabalho.</p>
              </div>
            )}

             {selectedSection === 'training' && (
              <div>
                <h3>Treinamento do Agente</h3>
                <p>Conteúdo da seção de Treinamento.</p>
              </div>
            )}

            {selectedSection === 'intents' && (
              <div>
                <h3>Intenções do Agente</h3>
                <p>Conteúdo da seção de Intenções.</p>
              </div>
            )}

            {selectedSection === 'integrations' && (
              <div>
                <h3>Integrações</h3>
                <p>Conteúdo da seção de Integrações.</p>
              </div>
            )}

            {selectedSection === 'channels' && (
              <div>
                <h3>Canais de Atendimento</h3>
                <p>Conteúdo da seção de Canais de Atendimento.</p>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSaveAgent}>Salvar Agente</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAgentModal;
