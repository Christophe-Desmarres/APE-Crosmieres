import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

// We load the store to have access to it outside the component context
import store from '@/store/index'

const routes = [

  //Road for root
  {
    path: '',
    name: 'root',
    component: HomeView
  },

  //Road for accueil
  {
    path: '/accueil',
    name: 'home',
    component: HomeView
  },

  //Road for login
  {
    path: '/connexion',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/login/UserLoginView.vue')
  },

  // route for creating event
  {
    path: '/creer-un-evenement',
    name: 'eventCreate',
    component: () => import( /* webpackChunkName: "create-event" */ '../views/events/EventCreateView.vue')
  },
  // route for update sale
  {
    path: '/modifier-un-evenement/:id',
    name: 'eventUpdate',
    component: () => import( /* webpackChunkName: "create-sale" */ '../views/events/EventUpdateView.vue')
  },

  // route for creating sale
  {
    path: '/creer-une-vente',
    name: 'saleCreate',
    component: () => import( /* webpackChunkName: "create-sale" */ '../views/sales/SaleCreateView.vue')
  },
  // route for update sale
  {
    path: '/modifier-une-vente/:id',
    name: 'saleUpdate',
    component: () => import( /* webpackChunkName: "create-sale" */ '../views/sales/SaleUpdateView.vue')
  },

  //Road for registration
  {
    path: '/inscription',
    name: 'registration',
    component: () => import( /* webpackChunkName: "login" */ '../views/registration/UserRegisterView.vue')
  },

  //Road for events list
  {
    path: '/liste-des-evenements',
    name: 'eventsList',
    component: () => import( /* webpackChunkName: "events-list" */ '../views/events/EventsListView.vue')
  },

  //Road for sales list
  {
    path: '/liste-des-ventes',
    name: 'salesList',
    component: () => import( /* webpackChunkName: "sales-list" */ '../views/sales/SalesListView.vue')
  },

  //Road for an event
  {
    path: '/detail-evenement/:id',
    name: 'event',
    component: () => import( /* webpackChunkName: "event" */ '../views/events/EventDetailView.vue')
  },

  //Road for a sale
  {
    path: '/detail-vente/:id',
    name: 'sale',
    component: () => import( /* webpackChunkName: "sale" */ '../views/sales/SaleDetailView.vue')
  },

  //Road for user profil
  {
    path: '/mon-profil',
    name: 'userprofil',
    component: () => import( /* webpackChunkName: "login" */ '../views/user/ProfilView.vue')
  },

  //Road for user list
  {
    path: '/users',
    name: 'users',
    component: () => import( /* webpackChunkName: "users" */ '../views/user/UsersListView.vue')
  },

  // route for creating event
  {
    path: '/presentation-des-membres-APE',
    name: 'memberList',
    component: () => import( /* webpackChunkName: "member-list" */ '../views/user/MemberView.vue')
  },

  //Road for 404 page
  {
    path: '/404',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '../views/errors/Page404View.vue')
  },

  //Road for back-office
  {
    path: '/administration',
    name: 'back-office',
    component: () => import( /* webpackChunkName: "login" */ '../views/back-office/BackOfficeView.vue')
  },

  //Road for legals mentions
  {
    path: '/mentions-legales',
    name: 'legal-notices',
    component: () => import( /* webpackChunkName: "legal-notices" */ '../views/legal-notices/LegalNoticesView.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Will execute before displaying the contents of the new route
router.beforeEach((to) => {
  // administrator
  // apemember
  // apeuser

  // Road page for visitor 
  switch (to.name) {
    case 'root':
      return true;

    case 'home':
      return true;

    case 'login':
      return true;

    case 'registration':
      return true;

    case '404':
      return true;


    case 'legal-notices':
      return true;

      // Road page for Registered 
    case 'memberList':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

    case 'eventsList':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

    case 'salesList':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

    case 'event':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

    case 'sale':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

    case 'userprofil':
      if (store.getters.getToken) {
        return true
      }
      return {
        name: "registration"
      };

      // Road for members 
    case 'back-office':
      // Only with if connected and the role 'admin' or APE members 
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };

    case 'saleUpdate':
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };

    case 'saleCreate':
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };

    case 'eventCreate':
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };

    case 'eventUpdate':
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };

    case 'users':
      if (store.getters.getToken && store.getters.getRole === 'administrator' || store.getters.getRole === 'apemember') {
        return true
      }
      return {
        name: "login"
      };
  }


  // if the road doesn't exit we return a 404
  return {
    name: "404"
  };
})

export default router;