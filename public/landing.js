import { $, api, busy, money, short, toast, setupReveals } from './shared.js';
setupReveals();

$('#runFlow').addEventListener('click', async () => {
  const button = $('#runFlow');
  busy(button, true);
  $('#flowStatus').textContent = 'Fetching HTTP 402…';
  $('#heroDecision').textContent = 'Evaluating';
  $('#heroReason').textContent = 'Binding payment terms to agent intent.';
  $('#walletState').textContent = 'Signer locked.';
  $('#pSettlement').textContent = 'Pending';
  try {
    const adminToken = sessionStorage.getItem('sentinelAdminToken') ?? '';
    const result = await api('/api/agent/run', {
      method: 'POST',
      headers: adminToken ? { 'x-sentinel-admin-token': adminToken } : {},
      body: '{}'
    });
    const offer = result.paymentRequired.accepts[0];
    $('#pAmount').textContent = money(offer.amount) + ' USDC';
    $('#pPayTo').textContent = short(offer.payTo, 7);
    $('#heroDecision').textContent = 'ALLOW';
    $('#heroReason').textContent = 'All intent and policy checks passed.';
    $('#walletState').textContent = 'Authorization created after guard approval.';
    $('#pSettlement').textContent = result.ok && result.http?.secondStatus === 200
      ? 'Dry-run receipt' : 'Merchant rejected';
    $('#flowStatus').textContent = '200 delivered · pre-sign guard passed';
    toast('Legitimate payment allowed');
  } catch (error) {
    const walletSigned = error.data?.wallet?.signed === true;
    $('#heroDecision').textContent = 'BLOCK';
    $('#heroReason').textContent = error.message.includes('Blue admin token')
      ? 'Open Blue, paste the startup token once, then return here.'
      : error.message;
    $('#walletState').textContent = walletSigned ? 'Dry-run authorization created.' : 'No authorization created.';
    $('#pSettlement').textContent = walletSigned ? 'Merchant rejected' : 'Blocked';
    $('#flowStatus').textContent = walletSigned ? 'Merchant rejected dry-run authorization' : 'Sentinel stopped authorization';
    toast(error.message);
  } finally {
    busy(button, false);
  }
});
