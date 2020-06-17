// Basic
import Vue from 'vue';
import Router from 'vue-router';

// Views :: Onboarding
import Welcome from '@/views/ongoing/Welcome.vue';
import howIsTheJourneyOrganized from '@/views/ongoing/HowIsTheJourneyOrganized.vue';
import chooseYourNavigationType from '@/views/ongoing/ChooseYourNavigationType.vue';

// Views :: Pages
import EstarPreparadoFazDiferenca from '@/views/pages/EstarPreparadoFazDiferenca.vue';
import MapaDeInvestigacaoDoNegocio from '@/views/pages/MapaDeInvestigacaoDoNegocio.vue';
import MapaDeInvestigacaoDaArea from '@/views/pages/MapaDeInvestigacaoDaArea.vue';
import EstresseENervosismo from '@/views/pages/EstresseENervosismo.vue';
import PerguntasPoderosas from '@/views/pages/PerguntasPoderosas.vue';
import AgoraEComVoce2 from '@/views/pages/AgoraEComVoce2.vue';
import InspireSeAqui1 from '@/views/pages/InspireSeAqui1.vue';
import PontoDePartidaParaAPratica from '@/views/pages/PontoDePartidaParaAPratica.vue';
import LidandoComAsEmocoes from '@/views/pages/LidandoComAsEmocoes.vue';
import ComoSePreparar from '@/views/pages/ComoSePreparar.vue';
import InspireSeAqui2 from '@/views/pages/InspireSeAqui2.vue';
import PontoDePartidaParaAPratica2 from '@/views/pages/PontoDePartidaParaAPratica2.vue';

// View :: Login
import Login from '@/views/login/Login.vue';
import Profile from '@/views/login/Profile.vue';
import ForgotPassword from '@/views/login/ForgotPassword.vue';
import SSO from '@/views/login/Sso.vue';

// Use Router
Vue.use(Router);

// Init Onboarding
const productOnboardingKey = `product-${process.env.VUE_APP_PRODUCT_ID}-onboarding`;
localStorage.setItem(productOnboardingKey, 'N');  ///////// DESABLE ONBOARDING  /////////
if (localStorage.getItem(productOnboardingKey) === null) {
  localStorage.setItem(productOnboardingKey, 'Y');
}

const router = new Router({
  // mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: () => {
        if (process.env.VUE_APP_SCORM_MODE !== 'ON')  return '/login';
        else  return '/estar-preparado-faz-diferenca';
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { transitionName: 'fade' },
    },
    {
      path: '/sso/:token',
      name: 'sso',
      component: SSO,
      meta: { transitionName: 'fade' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { transitionName: 'fade' },
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: { transitionName: 'fade' },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: { transitionName: 'slide', transitionOrder: 1 },
    },
    {
      path: '/how-is-the-journey-organized',
      name: 'howIsTheJourneyOrganized',
      component: howIsTheJourneyOrganized,
      meta: { transitionName: 'slide', transitionOrder: 2 },
    },
    {
      path: '/choose-your-navigation-type',
      name: 'chooseYourNavigationType',
      component: chooseYourNavigationType,
      meta: { transitionName: 'slide', transitionOrder: 3 },
    },
    {
      path: '/estar-preparado-faz-diferenca',
      name: 'EstarPreparadoFazDiferenca',
      component: EstarPreparadoFazDiferenca,
      meta: { transitionName: 'fade', transitionOrder: 10, pageId: 84 },
    },
    {
      path: '/mapa-de-investigacao-do-negocio',
      name: 'MapaDeInvestigacaoDoNegocio',
      component: MapaDeInvestigacaoDoNegocio,
      meta: { transitionName: 'fade', transitionOrder: 11, pageId: 85 },
    },
    {
      path: '/mapa-de-investigacao-da-area',
      name: 'MapaDeInvestigacaoDaArea',
      component: MapaDeInvestigacaoDaArea,
      meta: { transitionName: 'fade', transitionOrder: 12, pageId: 86 },
    },
    {
      path: '/estresse-e-nervosismo',
      name: 'EstresseENervosismo',
      component: EstresseENervosismo,
      meta: { transitionName: 'fade', transitionOrder: 13, pageId: 87 },
    },
    {
      path: '/perguntas-poderosas',
      name: 'PerguntasPoderosas',
      component: PerguntasPoderosas,
      meta: { transitionName: 'fade', transitionOrder: 14, pageId: 88 },
    },
    {
      path: '/agora-e-com-voce-2',
      name: 'AgoraEComVoce2',
      component: AgoraEComVoce2,
      meta: { transitionName: 'fade', transitionOrder: 15, pageId: 89 },
    },
    {
      path: '/inspire-se-aqui-1',
      name: 'InspireSeAqui1',
      component: InspireSeAqui1,
      meta: { transitionName: 'fade', transitionOrder: 16, pageId: 90 },
    },
    {
      path: '/ponto-de-partida-para-a-pratica',
      name: 'PontoDePartidaParaAPratica',
      component: PontoDePartidaParaAPratica,
      meta: { transitionName: 'fade', transitionOrder: 17, pageId: 91 },
    },
    {
      path: '/lidando-com-as-emocoes',
      name: 'LidandoComAsEmocoes',
      component: LidandoComAsEmocoes,
      meta: { transitionName: 'fade', transitionOrder: 18, pageId: 92 },
    },
    {
      path: '/como-se-preparar',
      name: 'ComoSePreparar',
      component: ComoSePreparar,
      meta: { transitionName: 'fade', transitionOrder: 19, pageId: 93 },
    },
    {
      path: '/inspire-se-aqui-2',
      name: 'InspireSeAqui2',
      component: InspireSeAqui2,
      meta: { transitionName: 'fade', transitionOrder: 20, pageId: 94 },
    },
    {
      path: '/ponto-de-partida-para-a-pratica-2',
      name: 'PontoDePartidaParaAPratica2',
      component: PontoDePartidaParaAPratica2,
      meta: { transitionName: 'fade', transitionOrder: 21, pageId: 95 },
    }
  ],
});

router.beforeEach((to, from, next) => {
  // Check if it is public
  const publicPages = ['login', 'forgotPassword', 'sso'];
  const authRequired = !publicPages.includes(to.name);

  // check token
  const productId = process.env.VUE_APP_PRODUCT_ID;
  const productTokenKey = `product-${productId}-token`;
  const loggedIn = localStorage.getItem(productTokenKey);

  // Check authentication
  if (authRequired && !loggedIn && process.env.VUE_APP_SCORM_MODE !== 'ON') {
    return next('/');
  }

  // Check tutorial
  const onBoardingPages = ['welcome', 'howIsTheJourneyOrganized', 'chooseYourNavigationType'];
  if (localStorage.getItem(productOnboardingKey) === 'N' && onBoardingPages.includes(to.name)) {
    if (process.env.VUE_APP_SCORM_MODE !== 'ON')  next({ path: '/comece-por-aqui' })
    else  next({ path: '/estar-preparado-faz-diferenca' })
  }

  next();
})

export default router;