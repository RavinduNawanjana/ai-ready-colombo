
(() => {
  document.querySelectorAll('[data-scenario-quiz] button').forEach(btn => {
    btn.addEventListener('click', () => {
      const quiz = btn.closest('[data-scenario-quiz]');
      quiz.querySelectorAll('button').forEach(b => b.classList.remove('correct','wrong'));
      const correct = btn.dataset.correct === 'true';
      btn.classList.add(correct ? 'correct' : 'wrong');
      quiz.querySelector('.scenario-feedback').textContent =
        correct ? 'Yes — AI can assist, while you keep the final judgment.' :
        'That gives AI too much authority for the stakes involved. Try another option.';
    });
  });

  const builder = document.querySelector('[data-prompt-builder]');
  if (builder) {
    const parts = [...builder.querySelectorAll('[data-prompt-part]')];
    const out = builder.querySelector('[data-prompt-output]');
    const rebuild = () => {
      const labels = {context:'Context',task:'Task',constraints:'Constraints',output:'Output'};
      const text = parts.map(p => p.value.trim() ? `${labels[p.dataset.promptPart]}: ${p.value.trim()}` : '').filter(Boolean).join('\n');
      out.textContent = text || 'Start typing above.';
    };
    parts.forEach(p => p.addEventListener('input', rebuild));
    builder.querySelector('[data-copy-prompt]')?.addEventListener('click', async (e) => {
      try {
        await navigator.clipboard.writeText(out.innerText);
        e.currentTarget.textContent = 'Copied';
        setTimeout(() => e.currentTarget.textContent = 'Copy prompt', 1200);
      } catch (_) {}
    });
  }

  const workflows = {
    learn: ['Ask for a clear explanation','Ask for an analogy or example','Ask the AI to test you','Explain your mistakes','Increase difficulty'],
    research: ['Define the question','Map the sub-questions','Identify source types','Find and open sources yourself','Verify claims before using them'],
    write: ['Create or bring a draft','Ask for critique before rewriting','Choose which feedback to accept','Revise','Do a final human read'],
    interview: ['Give the role and level','Generate likely questions','Answer one at a time','Ask for specific feedback','Repeat weak answers'],
    solve: ['Define the problem','Break it into parts','Generate options','Ask for counterarguments','Decide using your own criteria']
  };
  document.querySelectorAll('[data-workflow-tabs]').forEach(widget => {
    const panel = widget.querySelector('[data-workflow-panel]');
    const render = key => {
      const title = key[0].toUpperCase()+key.slice(1);
      panel.innerHTML = `<h3>${title} workflow</h3><ol>${workflows[key].map(x=>`<li>${x}</li>`).join('')}</ol>`;
    };
    widget.querySelectorAll('[data-workflow]').forEach(btn => btn.addEventListener('click', () => {
      widget.querySelectorAll('[data-workflow]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.workflow);
    }));
    render('learn');
  });

  const privacy = {
    chatgpt: {
      title:'ChatGPT',
      path:'Settings → Data Controls → “Improve the model for everyone”',
      note:'Turning this off is about model improvement. Chat history and memory are separate controls. Temporary Chat is another privacy option.',
      url:'https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt'
    },
    claude: {
      title:'Claude',
      path:'Settings → Privacy → “Help Improve our AI models”',
      note:'For eligible consumer accounts, model-improvement settings can be managed separately from normal chat use. Incognito chats have separate handling.',
      url:'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings'
    },
    gemini: {
      title:'Gemini',
      path:'Gemini Apps Activity → “Keep Activity”',
      note:'Activity settings affect how future chats are stored and used. Google describes some retention and feedback exceptions, so read the current help page.',
      url:'https://support.google.com/gemini/answer/13594961'
    },
    copilot: {
      title:'Microsoft Copilot',
      path:'Settings → Personalization / privacy controls',
      note:'Microsoft changed Copilot privacy controls in August 2026. In the updated consumer app, controls include memory, shared experiences, chat history, web search and ad personalization; Microsoft says prompts, responses and file contents in the updated app are not used to train foundation models. Older app versions use different controls.',
      url:'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls'
    }
  };
  document.querySelectorAll('[data-privacy-switcher]').forEach(widget => {
    const panel = widget.querySelector('[data-privacy-panel]');
    const render = key => {
      const d = privacy[key];
      panel.innerHTML = `<h3>${d.title}</h3><p><strong>Where to look:</strong> ${d.path}</p><p>${d.note}</p><a class="btn btn-light" target="_blank" rel="noopener" href="${d.url}">Official help page ↗</a>`;
    };
    widget.querySelectorAll('[data-provider]').forEach(btn => btn.addEventListener('click', () => {
      widget.querySelectorAll('[data-provider]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.provider);
    }));
    render('chatgpt');
  });
})();
