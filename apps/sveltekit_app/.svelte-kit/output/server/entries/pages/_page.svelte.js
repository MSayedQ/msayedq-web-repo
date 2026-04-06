import { a0 as head, e as escape_html, a1 as attr, a2 as ensure_array_like, a3 as attr_style, $ as derived } from "../../chunks/renderer.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const apiBase = "http://localhost:3000";
    let todos = [];
    let title = "";
    let snapshot = "Loading…";
    let count = derived(() => todos.length);
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>SvelteKit</title>`);
      });
    });
    $$renderer2.push(`<div class="repo-app"><div class="repo-container"><header class="repo-card"><h1 class="repo-title">SvelteKit</h1> <p class="repo-subtitle">Routing + SSR shell · API: <code>${escape_html(apiBase)}</code></p> <div class="repo-row"><input class="repo-input"${attr("value", title)} placeholder="Add todo"/> <button class="repo-btn repo-btn--primary" type="button">Add</button></div> <p class="repo-badge">Count: ${escape_html(count())}</p> <ul class="repo-list"><!--[-->`);
    const each_array = ensure_array_like(todos);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let todo = each_array[$$index];
      $$renderer2.push(`<li class="repo-item"><input type="checkbox"${attr("checked", todo.completed, true)}/> <span${attr_style(`text-decoration:${todo.completed ? "line-through" : "none"}`)}>${escape_html(todo.title)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <pre class="repo-kv">${escape_html(snapshot)}</pre></header></div></div>`);
  });
}
export {
  _page as default
};
