(function(){
  const route=document.body.dataset.route||'home';
  const defaults={project:'track=direct&page=launchplanner',direct:'track=direct&page=home',rsya:'track=direct&page=rsya',metrika:'track=metrika&topic=overview',seo:'track=seo&topic=overview',formulas:'track=direct&page=formulas',cases:'track=direct&page=practice',practice:'track=direct&page=practice',help:'track=direct&page=userguide'};
  let query=location.hash.length>1?decodeURIComponent(location.hash.slice(1)):location.search.slice(1);
  if(route==='search')query='q='+encodeURIComponent(new URLSearchParams(location.search).get('q')||'');
  location.replace('academy.html?'+(query||defaults[route]||'page=home'));
})();
