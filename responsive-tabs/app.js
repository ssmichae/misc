import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCTabBar} from '@material/tab-bar';
import {MDCDrawer} from "@material/drawer";


// Select DOM elements

const tabBarEl = document.querySelector('.mdc-tab-bar');
const tabEls = Array.from(document.querySelectorAll('.mdc-tab'));

const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const navIconEl = document.querySelector('.mdc-top-app-bar__navigation-icon');

const drawerEl = document.querySelector('.mdc-drawer');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const listItemEls = Array.from(document.querySelectorAll('.mdc-drawer .mdc-list-item'));

const mainContentEl = document.querySelector('.main-content');
const contentEls = Array.from(document.querySelectorAll('.content-section'));

// Initialize top app bar

const topAppBar = new MDCTopAppBar(topAppBarEl);

// Initialize modal drawer

const drawer = new MDCDrawer(drawerEl);
drawer.open = false;
topAppBar.setScrollTarget(mainContentEl);
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

// Initialize tab bar

const tabBar = new MDCTabBar(tabBarEl);

// Switch content on tab or drawer item activation

tabBarEl.addEventListener('MDCTabBar:activated', (e) => switchToSection(e.detail.index));
// Update to e.detail.index on next release: https://github.com/material-components/material-components-web/pull/4356
listEl.addEventListener('MDCList:action', (e) => switchToSection(e.detail));

const switchToSection = (index) => {
  contentEls.forEach(contentSection => {
    contentSection.style.display = getSectionName(contentSection, '-content') == getSectionName(tabEls[index], '-tab') ? 'block' : 'none';
  });
  
  // Make sure to update whichever one was not clicked on
  drawer.list_.selectedIndex = index; // https://github.com/material-components/material-components-web/issues/4364
  tabBar.activateTab(index);
}

const getSectionName = (el, sectionSuffix) => el.id.slice(0, -1 * sectionSuffix.length);

