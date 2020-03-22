import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
import auth from "./middlewares/auth"
import isAdmin from "./middlewares/isAdmin";
import middlewarePipeline from "./middlewarePipeline"

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'registration',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('../views/TicketView.vue'),
      meta: {
        middleware: [
            auth
        ]
      }
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('../views/EmailsView.vue'),
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TicketsView.vue'),
      meta: {
        middleware: [
          auth,
          isAdmin
        ]
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
