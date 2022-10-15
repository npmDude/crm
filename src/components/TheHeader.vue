<template>
  <header class="navbar navbar-expand-md sticky-top bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <img src="@/assets/logo.svg" alt="HJ" width="30" height="30" />
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#headerNavbar"
        aria-controls="headerNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="headerNavbar"
        ref="navbarCollapseEl"
        class="navbar-collapse collapse"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/agents"
              active-class="active"
              @click="hideNavbarCollapse"
            >
              Agents
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/clients"
              active-class="active"
              @click="hideNavbarCollapse"
            >
              Clients
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/inquiries"
              active-class="active"
              @click="hideNavbarCollapse"
            >
              Inquiries
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Collapse } from 'bootstrap';
import { computed, ref } from 'vue';

const navbarCollapseEl = ref<HTMLInputElement | null>(null);
const navbarCollapse = computed(() => {
  return navbarCollapseEl.value ? new Collapse(navbarCollapseEl.value) : null;
});
const hideNavbarCollapse = () => {
  navbarCollapse.value?.hide();
};
</script>
