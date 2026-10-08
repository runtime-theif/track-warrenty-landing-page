// TrackWarranty site script: referral passthrough, download tracking, brands form.
(function () {
  'use strict';

  var PLAY = 'play.google.com';

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ }
  }

  // Referral data: URL params win, then anything stored from an earlier visit.
  function getReferralData() {
    var p = new URLSearchParams(window.location.search);
    var data = {
      inviteCode: p.get('code') || p.get('invite'),
      referrerName: p.get('ref') || p.get('referrer'),
      utmSource: p.get('utm_source'),
      utmMedium: p.get('utm_medium'),
      utmCampaign: p.get('utm_campaign')
    };
    var stored = safeGet('trackwarranty_referral');
    if (stored) {
      try {
        var s = JSON.parse(stored);
        Object.keys(data).forEach(function (k) { if (!data[k] && s[k]) data[k] = s[k]; });
      } catch (e) { /* ignore bad JSON */ }
    }
    if (data.inviteCode || data.referrerName) {
      data.timestamp = Date.now();
      safeSet('trackwarranty_referral', JSON.stringify(data));
    }
    return data;
  }

  function playUrlWithReferrer(href, data) {
    var url = new URL(href);
    var r = new URLSearchParams();
    if (data.inviteCode) r.set('invite_code', data.inviteCode);
    if (data.referrerName) r.set('referrer_name', data.referrerName);
    r.set('utm_source', data.utmSource || 'website');
    r.set('utm_medium', data.utmMedium || 'website');
    r.set('utm_campaign', data.utmCampaign || (data.inviteCode ? 'referral_program' : 'site'));
    url.searchParams.set('referrer', r.toString());
    return url.toString();
  }

  function wireDownloads() {
    var data = getReferralData();
    document.querySelectorAll('a[href*="' + PLAY + '"]').forEach(function (a) {
      a.setAttribute('href', playUrlWithReferrer(a.getAttribute('href'), data));
      a.addEventListener('click', function () {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'download_click', {
            platform: 'android',
            placement: a.getAttribute('data-track') || 'unknown',
            invite_code: data.inviteCode || undefined
          });
        }
      });
    });
  }

  // Brands demo form: no backend, so hand off to WhatsApp (and show email fallback).
  function wireBrandsForm() {
    var form = document.getElementById('demo-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var lines = [
        'Hi TrackWarranty, I would like a brands demo.',
        'Name: ' + (f.get('name') || ''),
        'Email: ' + (f.get('email') || ''),
        'Brand: ' + (f.get('brand') || ''),
        'Units / month: ' + (f.get('volume') || ''),
        'Want to fix first: ' + (f.get('goal') || '')
      ];
      var text = encodeURIComponent(lines.join('\n'));
      if (typeof window.gtag === 'function') window.gtag('event', 'brand_demo_request', { brand: f.get('brand') || '' });
      window.open('https://wa.me/916207466460?text=' + text, '_blank', 'noopener');
      var note = document.getElementById('demo-note');
      if (note) {
        note.textContent = 'Opening WhatsApp… If it didn’t open, email vidya@repliantai.com or call +91 62074 66460.';
      }
    });
  }

  function setYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireDownloads();
    wireBrandsForm();
    setYear();
  });
})();
