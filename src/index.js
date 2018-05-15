import RenderingService from './renderingService';

const rootElement = document.getElementById('rootElement');
var renderingService = new RenderingService(rootElement);
renderingService.render();