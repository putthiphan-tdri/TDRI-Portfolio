(function () {
  if (typeof initOwnerAuth === 'function') return;

  const localApp =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';
  let ownerAuthenticated = localApp;
  let loginModalOpen = false;
  let loginError = '';

  const originalRender = render;
  const originalBeginEditing = beginEditing;
  const originalCommitDraft = commitDraft;

  saveData = function saveOwnerData() {
    syncCategoryCounts();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (!localApp && ownerAuthenticated) {
        fetch('/api/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Portfolio-Owner': '1',
          },
          credentials: 'same-origin',
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.status === 401) {
            ownerAuthenticated = false;
            window.alert('Your owner session expired. Please log in again before saving more changes.');
            render();
          }
        }).catch(() => {});
      }
      return true;
    } catch {
      window.alert('This change could not be saved in the browser. Try a smaller image or export a backup before continuing.');
      return false;
    }
  };

  beginEditing = function beginOwnerEditing(...args) {
    if (!ownerAuthenticated) {
      openLoginModal();
      return;
    }
    originalBeginEditing(...args);
  };

  commitDraft = function commitOwnerDraft(...args) {
    if (!ownerAuthenticated) {
      openLoginModal();
      return;
    }
    originalCommitDraft(...args);
  };

  render = function renderWithOwnerAuth() {
    originalRender();
    decorateOwnerControls();
    if (loginModalOpen) document.body.insertAdjacentHTML('beforeend', renderOwnerLoginModal());
    bindOwnerEvents();
  };

  function decorateOwnerControls() {
    if (localApp) return;

    document.querySelectorAll('[data-action="import"], [data-action="export"], [data-action="toggle-edit"]').forEach((button) => {
      button.hidden = !ownerAuthenticated;
    });
    document.querySelectorAll('[data-action="edit-section"], [data-action="edit-skills-core"], [data-action="edit-skills-certifications"]').forEach((button) => {
      button.hidden = !ownerAuthenticated;
    });
    document.querySelectorAll('[data-action="photo-upload"]').forEach((input) => {
      input.disabled = !ownerAuthenticated;
    });

    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    headerActions.querySelectorAll('[data-owner-auth-control]').forEach((button) => button.remove());
    const profileButton = headerActions.querySelector('.profile-button');
    const authButton = document.createElement('button');
    authButton.type = 'button';
    authButton.className = 'owner-link-button';
    authButton.dataset.ownerAuthControl = 'true';
    authButton.dataset.action = ownerAuthenticated ? 'owner-logout' : 'owner-login';
    authButton.innerHTML = ownerAuthenticated ? 'Log out' : `${icon('edit')}<span>Owner login</span>`;
    headerActions.insertBefore(authButton, profileButton);
  }

  function bindOwnerEvents() {
    document.querySelectorAll('[data-action="owner-login"]').forEach((button) => {
      button.addEventListener('click', openLoginModal);
    });
    document.querySelectorAll('[data-action="owner-logout"]').forEach((button) => {
      button.addEventListener('click', logoutOwner);
    });
    document.querySelectorAll('[data-action="owner-login-submit"]').forEach((form) => {
      form.addEventListener('submit', submitOwnerLogin);
    });
    document.querySelectorAll('[data-action="close-owner-login"]').forEach((element) => {
      element.addEventListener('click', (event) => {
        if (event.currentTarget === event.target || event.currentTarget.classList.contains('owner-login-close')) {
          closeLoginModal();
        }
      });
    });
  }

  function openLoginModal() {
    if (localApp) return;
    loginError = '';
    loginModalOpen = true;
    render();
  }

  function closeLoginModal() {
    loginModalOpen = false;
    loginError = '';
    render();
  }

  async function submitOwnerLogin(event) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const details = await response.json().catch(() => ({}));
        loginError = details.error || 'Login failed';
        render();
        return;
      }

      ownerAuthenticated = true;
      loginModalOpen = false;
      loginError = '';
      render();
    } catch {
      loginError = 'Login failed. Please try again.';
      render();
    }
  }

  async function logoutOwner() {
    discardDraft();
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
        credentials: 'same-origin',
      });
    } catch {}

    ownerAuthenticated = false;
    loginModalOpen = false;
    render();
  }

  function renderOwnerLoginModal() {
    return `
      <div class="owner-login-backdrop" role="presentation" data-action="close-owner-login">
        <form class="owner-login-panel" data-action="owner-login-submit" role="dialog" aria-modal="true" aria-label="Owner login">
          <button class="icon-button owner-login-close" type="button" data-action="close-owner-login" aria-label="Close owner login">x</button>
          <span class="owner-login-kicker">Portfolio owner</span>
          <h2>Unlock editing</h2>
          <p>Visitors can view this portfolio. Editing is available only after owner login.</p>
          <label>
            <span>Password</span>
            <input type="password" name="password" autocomplete="current-password" required autofocus>
          </label>
          ${loginError ? `<small class="owner-login-error">${escapeHtml(loginError)}</small>` : ''}
          <button class="primary-button" type="submit">Log in</button>
        </form>
      </div>
    `;
  }

  async function initOwnerAuthPatch() {
    if (localApp) return;

    try {
      const response = await fetch('/api/auth', {
        cache: 'no-store',
        credentials: 'same-origin',
      });
      if (!response.ok) return;
      const status = await response.json();
      ownerAuthenticated = Boolean(status.authenticated);
      render();
    } catch {}
  }

  decorateOwnerControls();
  bindOwnerEvents();
  initOwnerAuthPatch();
})();
