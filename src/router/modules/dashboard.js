import Layout from '@/layout'
import { rolesPerm } from '@/utils/constantVariable'

const dashboardRouter = {
  path: '/',
  component: Layout,
  redirect: '/',
  meta: {
    title: 'dashboard',
    icon: 'dashboard',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
  },
  active: false,
  children: [
    // {
    //   path: '/',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: {
    //     title: 'dashboard_case',
    //     icon: 'dashboard',
    //     child: true,
    //     noCache: true,
    //     roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
    //   }
    // },
    {
      path: '/',
      component: () => import('@/views/dashboard/caseNew'),
      meta: {
        title: 'dashboard_case_new',
        icon: 'dashboard',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    },
    {
      path: '/dashboard/test-result',
      component: () => import('@/views/dashboard/testResult'),
      meta: {
        title: 'dashboard_test_result',
        icon: 'dashboard',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    }
  ]
}

export default dashboardRouter
