import{d8 as Ci,dH as Pi,nZ as Je,rn as bt,fd as wt,rh as St,ro as Ct,g2 as ti,Gk as Ke,FY as Ti,cM as ii,Gl as Di,bB as O,ce as et,is as _e,lY as Ri,f8 as ai,gP as Et,ej as Mi,D_ as mt,bz as Oe,ei as Ai,e8 as Gi,Gm as $t,bA as Fi,be as Ii,fJ as zi,fR as Ei,ln as $i,gw as Oi,bD as Pt,fM as Bi,bR as qe,mf as Vi,yC as qi,ek as ki,mN as Li,Gn as Ot,dL as gt,DZ as Hi,Go as ji,FR as Wi,vH as x,dQ as Tt,vQ as xe,Gp as Ni,i as C,vZ as he,fI as Dt,vI as tt,Gq as Be,vG as vt,E5 as Ui,EJ as We,lq as Rt,E3 as Ne,FF as Bt,Gr as _t,Gs as Vt,Gt as Yi,Gu as Xi,Gv as Zi,Gw as Qi,E7 as si,vR as ae,Fk as ni,Gx as Ji,DM as Le,pr as it,pt as at,_ as st,pv as nt,E9 as Mt,pw as ri,n as Ce,Gy as Ki,Fz as ea,mH as oi,mI as li,rU as qt,D$ as Ee,bf as pe,Gz as ze,pz as kt,yB as Lt,se as Ht,bC as Ve,mE as ci,GA as ui,m as fe,Ej as ta,eV as ia,r4 as aa,d as dt,r6 as sa,m0 as jt,ew as na,i8 as ra,rg as oa,b$ as la,r5 as ca,cO as ua,bh as ht,r7 as da,O as ha,T as pa,g1 as fa,r8 as ma,lL as Wt,dY as ga,r9 as va,gO as _a,ow as xa,x as ya}from"./index-CDFYXRI5.js";import{v as ba,M as Nt,E as wa}from"./tiles3DUtils-Coh9efrm.js";import{a as Sa}from"./LayerView3D-CGzEbl9n.js";import{E as Ca}from"./LayerElevationProvider-CIgpWCFG.js";import{h as Pa}from"./baUtils-BPOvURe8.js";import{M as Ta}from"./Tiles3DBVH-Yo05h4Em.js";import{I as Da}from"./LayerView-COiJJOWn.js";import"./projectBoundingSphere-CwKmx1Jj.js";let Ra=class extends Ci{constructor(e,t,i,a,s,r,o,u,l){super(e,0,0,0,t),this.usedMemory=e,this.nodes=t,this.usedTileMemory=i,this.cachedNodes=a,this.cacheTileMemory=s,this.textureAtlasMemory=r,this.orderTextureMemory=o,this.fadingTextureMemory=u,this.sortBufferMemory=l}};const se=4096,At=64,Ge=1023,ye=Ge+1,di=se*At/ye,Ue=4,Ma=ye*Ue,Ut=Ge*Ue,Aa=se*At;let Ga=class{constructor(e=di){this._pageCount=e;const t=Math.ceil(e/32);this._bitset=new Uint32Array(t)}get pageCount(){return this._pageCount}isAllocated(e){const t=e/32|0,i=e%32;return!!(this._bitset[t]&1<<i)}allocate(e){const t=e/32|0,i=e%32;this._bitset[t]|=1<<i}free(e){const t=e/32|0,i=e%32;this._bitset[t]&=~(1<<i)}findFirstFreePage(){for(let e=0;e<this._bitset.length;e++)if(this._bitset[e]!==4294967295)for(let t=0;t<32;t++){const i=32*e+t;if(i>=this._pageCount)break;if(!(this._bitset[e]&1<<t))return i}return null}resize(e){this._pageCount=e;const t=Math.ceil(e/32),i=this._bitset.length;if(t!==i){const a=new Uint32Array(t),s=Math.min(i,t);a.set(this._bitset.subarray(0,s)),this._bitset=a}this._clearExcessBits(this._bitset,e)}_clearExcessBits(e,t){const i=Math.floor((t-1)/32),a=(t-1)%32;if(t>0&&a<31){const s=(1<<a+1)-1;e[i]&=s}i+1<e.length&&e.fill(0,i+1)}},Fa=class extends Pi{constructor(e){super("GaussianSplatSortWorker","sort",{sort:t=>[t.distances.buffer,t.atlasIndices.buffer,t.sortedAtlasIndices.buffer]},e,{strategy:"dedicated"})}sort(e,t){return this.invokeMethod("sort",e,t)}clear(){return this.broadcast({},"clear")}async destroyWorkerAndSelf(){await this.broadcast({},"destroy"),this.destroy()}};class Ia{constructor(e){this.texture=null,this._fadeTextureCapacity=0,this._rctx=e}get usedMemory(){return(this.texture?.usedMemory??0)+Je(this._fadeBuffer)}ensureCapacity(e){const t=this.texture;if(this._fadeTextureCapacity>=e&&t?.hasWebGLTextureObject)return;const i=Math.max(Math.ceil(e*Ke),di),[a,s]=this._evalTextureSize(i),r=a*s,o=this._fadeBuffer,u=new Uint8Array(r);o&&u.set(o.subarray(0,this._fadeTextureCapacity)),this._fadeBuffer=u,this._fadeTextureCapacity=r,this.texture?.dispose();const l=new bt;l.width=a,l.height=s,l.pixelFormat=36244,l.dataType=wt.UNSIGNED_BYTE,l.internalFormat=St.R8UI,l.unpackAlignment=1,l.wrapMode=33071,l.samplingMode=9728,l.isImmutable=!0,this.texture=new Ct(this._rctx,l)}updateTexture(e){this.ensureCapacity(e);const t=this.texture.descriptor.width,i=Math.ceil(e/t),a=t*i;this.texture.updateData(0,0,0,t,i,this._fadeBuffer.subarray(0,a))}updateBuffer(e,t){this.ensureCapacity(t+1),this._fadeBuffer&&(this._fadeBuffer[t]=e)}clear(){this._fadeBuffer=void 0,this._fadeTextureCapacity=0,this.texture?.dispose(),this.texture=null}destroy(){this.clear()}_evalTextureSize(e){const t=Math.ceil(Math.sqrt(e)),i=Math.ceil(e/t);return ti(t,i)}}let za=class{constructor(e){this.texture=null,this._orderTextureCapacity=0,this._rctx=e}get usedMemory(){return(this.texture?.usedMemory??0)+Je(this._uploadAtlasIndices)}ensureCapacity(e){if(e<=0)return{textureWidth:0,rowCount:0,paddedSize:0};const t=this.texture;if(this._orderTextureCapacity>=e&&t?.hasWebGLTextureObject){const l=t.descriptor.width,d=Math.ceil(e/l);return{textureWidth:l,rowCount:d,paddedSize:l*d}}const i=Math.max(Math.ceil(e*Ke),Aa),[a,s]=this._evalTextureSize(i),r=a*s;this._orderTextureCapacity=r,this.texture?.dispose();const o=new bt;o.width=a,o.height=s,o.pixelFormat=36244,o.dataType=wt.UNSIGNED_INT,o.internalFormat=St.R32UI,o.wrapMode=33071,o.samplingMode=9728,o.isImmutable=!0,this.texture=new Ct(this._rctx,o);const u=Math.ceil(e/a);return{textureWidth:a,rowCount:u,paddedSize:a*u}}setData(e,t){const{textureWidth:i,rowCount:a,paddedSize:s}=this.ensureCapacity(t);if(e.length>=s)return void this.texture.updateData(0,0,0,i,a,e);(!this._uploadAtlasIndices||this._uploadAtlasIndices.length<s)&&(this._uploadAtlasIndices=new Uint32Array(s));const r=this._uploadAtlasIndices;r.set(e.subarray(0,t)),this.texture.updateData(0,0,0,i,a,r)}clear(){this._orderTextureCapacity=0,this._uploadAtlasIndices=void 0,this.texture?.dispose(),this.texture=null}destroy(){this.clear()}_evalTextureSize(e){const t=Math.ceil(Math.sqrt(e)),i=Math.ceil(e/t);return ti(t,i)}},Ea=class{constructor(e,t,i,a){this._splatAtlasTextureHeight=At,this.texture=null,this._rctx=e,this._fboCache=i,this._onCachedTextureEvicted=a,this.pageAllocator=new Ga,this._cache=t.newCache("gaussian texture cache",s=>{s.dispose(),this._onCachedTextureEvicted()})}get usedMemory(){return this.texture?.usedMemory??0}ensureTextureAtlas(){if(this.texture?.hasWebGLTextureObject)return;this.texture=null;const e=this._cache.pop("splatTextureAtlas");if(e)return void(this.texture=e);const t=new bt;t.height=this._splatAtlasTextureHeight,t.width=se,t.pixelFormat=36249,t.dataType=wt.UNSIGNED_INT,t.internalFormat=St.RGBA32UI,t.samplingMode=9728,t.wrapMode=33071,t.isImmutable=!0,this.texture=new Ct(this._rctx,t),this._updatePageAllocator()}grow(){if(!this.texture)return this.ensureTextureAtlas(),!1;const e=Math.floor(this._splatAtlasTextureHeight*Ke);if(e>Math.min(Pa("esri-mobile")?1048:4096,this._rctx.parameters.maxTextureSize))return!1;const t=new Ti(this._rctx,this.texture),i=this._fboCache.acquire(se,e,"gaussian splat atlas resize",12);return this._rctx.blitFramebuffer(t,i.fbo,16384,9728,0,0,se,this._splatAtlasTextureHeight,0,0,se,this._splatAtlasTextureHeight),this.texture=i.fbo?.detachColorTexture(),t.dispose(),i.dispose(),this._splatAtlasTextureHeight=e,this._updatePageAllocator(),!0}requestPage(){let e=this.pageAllocator.findFirstFreePage();return e===null&&this.grow()&&(e=this.pageAllocator.findFirstFreePage()),e!==null&&this.pageAllocator.allocate(e),e}freePage(e){this.pageAllocator.free(e)}update(e,t,i){this.ensureTextureAtlas(),this.texture.updateData(0,e,t,ye,1,i)}_updatePageAllocator(){const e=se*this._splatAtlasTextureHeight/ye;this.pageAllocator.pageCount!==e&&this.pageAllocator.resize(e)}clear(){this.texture&&(this._cache.put("splatTextureAtlas",this.texture),this.texture=null)}destroy(){this._onCachedTextureEvicted=()=>{},this._cache.destroy(),this.texture?.dispose(),this.texture=null}};class $a{constructor(e,t,i){this._updating=ii(!1),this._useDeterministicSort=!1,this._sortBufferMemory=0,this.visibleGaussians=0,this._visibleTileDepthRange=new Di,this._previousVisibleTileDepthRangeEye=O(),this._previousVisibleTileDepthRangeViewForward=O(),this._previousVisibleTileDepthRangeClippingBox=et(),this._latestSortedGaussianTilesVersion=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._previousVisibleTileDepthRangeHasClippingBox=!1,this._bufferCapacity=0,this._requestedLyr3dVisibilityChange=0,this._latestCompletedLyr3dVisibilityChange=0,this._latestUpdatedGaussianTiles=new Array,this._latestSortedGaussianTiles=new Array,this._nextCommittedVisibleGaussianTiles=new Array,this._cameraDirectionNormalized=O(),this._frameTask=null,this._workerHandle=null,this._sortAbortController=null,this._isSorting=!1,this._pendingSortTask=!1,this._scheduledSortStartTimeout=null,this._lastSortStartTime=_e(-1/0),this._sortInterval=_e(80),this._renderer=e,this._onSortComplete=t,this._orderTexture=new za(this._renderer.renderingContext),this._fadingTexture=new Ia(this._renderer.renderingContext),this._textureAtlas=new Ea(this._renderer.renderingContext,this._renderer.view.resourceController.memoryController,this._renderer.fboCache,i);const{resourceController:a}=this._renderer.view;this._workerHandle=new Fa(Ri(a)),this._frameTask=a.scheduler.registerTask(ai.GAUSSIAN_SPLAT_SORTING)}get textureAtlas(){return this._textureAtlas}get orderTexture(){return this._orderTexture}get fadingTexture(){return this._fadingTexture}get textureAtlasMemory(){return this._textureAtlas.usedMemory}get orderTextureMemory(){return this._orderTexture.usedMemory}get fadingTextureMemory(){return this._fadingTexture.usedMemory}get sortBufferMemory(){return this._sortBufferMemory}get usedMemory(){return this.textureAtlasMemory+this.orderTextureMemory+this.fadingTextureMemory+this.sortBufferMemory}queryVisibleTileDepthRange(e,t){if(this.visibleGaussians===0)return null;const{eye:i,viewForward:a}=e,s=i[0],r=i[1],o=i[2],u=a[0],l=a[1],d=a[2],c=this._visibleTileDepthRange;if(this._previousVisibleTileDepthRangeTilesVersion===this._latestSortedGaussianTilesVersion&&Et(this._previousVisibleTileDepthRangeEye,i)&&Et(this._previousVisibleTileDepthRangeViewForward,a)&&(t==null?!this._previousVisibleTileDepthRangeHasClippingBox:this._previousVisibleTileDepthRangeHasClippingBox&&Mi(this._previousVisibleTileDepthRangeClippingBox,t)))return c.near<=c.far?c:null;let g=1/0,h=-1/0;const p=this._latestSortedGaussianTiles;for(let y=0;y<p.length;y++){const b=p[y];if(t!=null){const M=b.boundingBox;if(!mt(M,t))continue}const A=u*(b.obbCenterX-s)+l*(b.obbCenterY-r)+d*(b.obbCenterZ-o),T=b.paddedMbsRadius,R=A-T;R<g&&(g=R);const G=A+T;G>h&&(h=G)}const P=g<=h;return P?c.set(g,h):c.set(1/0,-1/0),this._previousVisibleTileDepthRangeTilesVersion=this._latestSortedGaussianTilesVersion,this._previousVisibleTileDepthRangeHasClippingBox=t!=null,Oe(this._previousVisibleTileDepthRangeEye,i),Oe(this._previousVisibleTileDepthRangeViewForward,a),t!=null&&Ai(this._previousVisibleTileDepthRangeClippingBox,t),P?c:null}updateGaussianVisibility(e,t){this._latestUpdatedGaussianTiles=e,this._requestedLyr3dVisibilityChange=t,this.requestSort()}get updating(){return this._updating.value}destroy(){this._sortAbortController=Gi(this._sortAbortController),this._pendingSortTask=!1,this._updating.value=!1,this._scheduledSortStartTimeout!=null&&(clearTimeout(this._scheduledSortStartTimeout),this._scheduledSortStartTimeout=null),this._frameTask.remove(),this._workerHandle?.destroyWorkerAndSelf(),this._textureAtlas.destroy(),this._orderTexture.destroy(),this._fadingTexture.destroy()}requestSort(){return this._updating.value=!0,!this._pendingSortTask&&(this._pendingSortTask=!0,this._scheduleSortStart(),!0)}_scheduleSortStart(){if(this._isSorting)return;const e=$t()-this._lastSortStartTime,t=this._sortInterval-e;t<=0?this._startSortIfRequired():this._scheduledSortStartTimeout==null&&(this._scheduledSortStartTimeout=setTimeout(()=>{this._scheduledSortStartTimeout=null,this._pendingSortTask&&!this._isSorting&&this._scheduleSortStart()},t))}_startSortIfRequired(){if(this._isSorting||!this._pendingSortTask)return;const e=new AbortController;this._sortAbortController=e,this._isSorting=!0,this._pendingSortTask=!1,this._lastSortStartTime=$t(),this._sortOnWorker(e.signal).finally(()=>{this._sortAbortController===e&&(this._sortAbortController=null),this._handleSortComplete()})}_handleSortComplete(){this._isSorting=!1,this._pendingSortTask?this._scheduleSortStart():this._updating.value=!1}_clearBuffersAndTextures(){this._atlasIndicesBuffer=void 0,this._sortedAtlasIndicesBuffer=void 0,this._distancesBuffer=void 0,this._bufferCapacity=0,this._sortBufferMemory=0,this._orderTexture.clear(),this._textureAtlas.clear()}_computeExpandedCapacity(e,t){let i=Math.max(1,e);for(;i<t;)i=Math.ceil(i*Ke);return i}_ensureSortBufferCapacities(e){if(this._bufferCapacity<e){const t=this._computeExpandedCapacity(this._bufferCapacity,e);this._atlasIndicesBuffer=new Uint32Array(t),this._sortedAtlasIndicesBuffer=new Uint32Array(t),this._distancesBuffer=new Float64Array(t),this._bufferCapacity=t,this._sortBufferMemory=Je(this._atlasIndicesBuffer,this._sortedAtlasIndicesBuffer,this._distancesBuffer)}}_clearAllBuffersAndTextures(){this._clearBuffersAndTextures(),this._latestSortedGaussianTiles.length=0,this._nextCommittedVisibleGaussianTiles.length=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._workerHandle?.clear()}async _sortOnWorker(e){try{if(this._latestUpdatedGaussianTiles.length===0)return this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=this._requestedLyr3dVisibilityChange,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),void this._renderer.requestRender(1);this._useDeterministicSort&&this._latestUpdatedGaussianTiles.sort((_,D)=>_.obb.centerX-D.obb.centerX||_.obb.centerY-D.obb.centerY||_.obb.centerZ-D.obb.centerZ);const t=this._latestUpdatedGaussianTiles,i=t.length,a=this._requestedLyr3dVisibilityChange;let s=0;for(let _=0;_<i;_++)s+=t[_].gaussianCount;this._ensureSortBufferCapacities(s),this._textureAtlas.ensureTextureAtlas();const r=this._renderer.camera;Fi(this._cameraDirectionNormalized,r.ray.direction);const o=this._cameraDirectionNormalized[0],u=this._cameraDirectionNormalized[1],l=this._cameraDirectionNormalized[2];let d=0;const c=this._atlasIndicesBuffer,g=this._distancesBuffer,h=this._renderer.clippingBox,p=this._nextCommittedVisibleGaussianTiles;p.length=0;let P=0;const{frustum:y}=r,b=this._renderer.tileCullingRevision,A=y[0],T=y[1],R=y[2],G=y[3],M=y[4],F=y[5];for(let _=0;_<i;_++){const D=t[_],{gaussianAtlasIndices:K,relativePositions:Y,obbCenterX:V,obbCenterY:L,obbCenterZ:z,paddedMbsRadius:f}=D,m=D.gaussianCount;if(D.cullingRevision!==b){let E=h==null||mt(D.boundingBox,h);if(E){const v=1.5*f;E=A[0]*V+A[1]*L+A[2]*z+A[3]<v&&T[0]*V+T[1]*L+T[2]*z+T[3]<v&&R[0]*V+R[1]*L+R[2]*z+R[3]<v&&G[0]*V+G[1]*L+G[2]*z+G[3]<v&&M[0]*V+M[1]*L+M[2]*z+M[3]<v&&F[0]*V+F[1]*L+F[2]*z+F[3]<v}D.cullingRevision=b,D.cullingVisible=E}if(!D.cullingVisible)continue;c.set(K,d),p[P++]=D;const w=o*V+u*L+l*z,S=d+m;for(let E=d,v=0;E<S;E++,v+=3){const $=Y[v],j=Y[v+1],W=Y[v+2];g[E]=$*o+j*u+W*l+w}d=S}if(p.length=P,d===0)return this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=a,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),void this._renderer.requestRender(1);const U={distances:this._distancesBuffer,atlasIndices:this._atlasIndicesBuffer,sortedAtlasIndices:this._sortedAtlasIndicesBuffer,numGaussians:d,preciseSort:this._useDeterministicSort},I=await this._workerHandle?.sort(U,e);if(e.aborted)return;I&&(this._distancesBuffer=I.distances,this._atlasIndicesBuffer=I.atlasIndices,this._sortedAtlasIndicesBuffer=I.sortedAtlasIndices);const B=async _=>{this._orderTexture.setData(this._sortedAtlasIndicesBuffer,d);const D=this._latestSortedGaussianTiles;this._latestSortedGaussianTiles=p,this._nextCommittedVisibleGaussianTiles=D,this._latestSortedGaussianTilesVersion++,this._latestCompletedLyr3dVisibilityChange=a,this.visibleGaussians=d,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),this._renderer.requestRender(1),_.madeProgress()};await this._frameTask.schedule(B,e)}catch(t){if(Ii(t))return}}set useDeterministicSort(e){this._useDeterministicSort=e}}var k;let Oa=(k=class{constructor(e){this.layerView=e,this._numFadingTiles=ii(0),this._tmpFullyFadedOutTiles=new Array,this._previousNumFadingTiles=0,this._lastStoppedFading=_e(0),this._currentFadeDuration=this.baseFadeDuration}get numFadingTiles(){return this._numFadingTiles.value}fadeTile(e,t,i){const a=this._getTargetOpacity(t);if(e.fadeDirection=t,!this.fadingEnabled)return void this._instantTileFading(e,a);const s=e.opacityModifier;if(s!==a){const r=this._getFadeProgressFromOpacity(s,t);this._startTileFading(e,r,i)}else this._stopTileFading(e)}updateAllTileFading(e){const t=this._tmpFullyFadedOutTiles;t.length=0,this.layerView.tileHandles.forEach(i=>{this._updateTileFading(i,e)&&t.push(i)}),t.length>0&&(this.layerView.notifyTileObbsChanged(t),this._numFadingTiles.value===0&&this.layerView.updateGaussians()),this._numFadingTiles.value>0&&this.layerView.view.stage?.renderView.requestRender(2)}onFadeDurationChanged(e){e===0&&this.numFadingTiles>0&&this._instantlyFullyFadeAllTiles()}isTileFadingOut(e){return e.fadeProgress!=null&&e.fadeDirection===1}onTileDiscarded(e){e.fadeProgress!=null&&(this._numFadingTiles.value--,this._numFadingTiles.value===0&&(this._lastStoppedFading=_e(performance.now())))}updateFadeDuration(){if(this.numFadingTiles&&this.numFadingTiles>=this._previousNumFadingTiles){const e=.95*this._currentFadeDuration;this._currentFadeDuration=_e(Math.max(e,k.minimumFadeDuration))}else this.numFadingTiles===0&&performance.now()-this._lastStoppedFading>k.resetFadeDurationInterval&&(this._currentFadeDuration=this.baseFadeDuration);return this._previousNumFadingTiles=this.numFadingTiles,this._currentFadeDuration}get updating(){return this._numFadingTiles.value>0}get baseFadeDuration(){return this.layerView.view.qualitySettings.fadeDuration}get fadingEnabled(){return this.baseFadeDuration!==0}_startTileFading(e,t,i){e.fadeProgress==null&&this._numFadingTiles.value++,e.fadeDuration=i,e.fadeProgress=t}_stopTileFading(e){e.fadeProgress!=null&&(e.fadeDirection===1&&this._onTileFullyFadedOut(e),this._numFadingTiles.value--,this._numFadingTiles.value===0&&(this._lastStoppedFading=_e(performance.now())),e.fadeDuration=null,e.fadeProgress=null)}_updateTileFading(e,t){const{fadeProgress:i,fadeDirection:a}=e;if(i==null)return!1;const s=this._fadeDirectionToSign(a),r=e.fadeDuration,o=this._getTargetOpacity(a),u=t/Math.abs(r||1),l=Math.min(i+u,1),d=s*(1-(a===0?k.fadeInEase:k.fadeOutEase)(l)),c=l===1;if(e.opacityModifier=c?o:o-d,c){const g=a===1;return this._stopTileFading(e),this._updateOpacityModifier(e),g}return e.fadeProgress=l,this._updateOpacityModifier(e),!1}_updateOpacityModifier(e){const t=255*e.opacityModifier;for(let i=0;i<e.pageIds.length;i++){const a=e.pageIds[i];this.layerView.data.fadingTexture.updateBuffer(t,a)}}_instantTileFading(e,t){e.fadeDuration=null,e.fadeProgress=null,e.opacityModifier=t,this._updateOpacityModifier(e),e.fadeDirection===1&&this._onTileFullyFadedOut(e)}_instantlyFullyFadeAllTiles(){const e=this._tmpFullyFadedOutTiles;e.length=0,this.layerView.tileHandles.forEach(t=>{if(t.fadeProgress!=null){const i=t.fadeDirection===1;this._instantTileFading(t,this._getTargetOpacity(t.fadeDirection)),i&&e.push(t)}}),e.length>0&&(this.layerView.updateGaussians(),this.layerView.notifyTileObbsChanged(e)),this._numFadingTiles.value=0}_onTileFullyFadedOut(e){e.lifecycleState=0,this.layerView.moveTileToCache(e)}_fadeDirectionToSign(e){return e===0?1:-1}_getTargetOpacity(e){return e===0?1:0}_getFadeProgressFromOpacity(e,t){const i=Math.max(0,Math.min(e,1));return t===0?k.inverseFadeInEase(i):k.inverseFadeOutEase(i)}},k.fadeInEase=e=>e*(2-e),k.fadeOutEase=e=>e*e,k.inverseFadeInEase=e=>1-Math.sqrt(1-e),k.inverseFadeOutEase=e=>Math.sqrt(1-e),k.minimumFadeDuration=_e(80),k.resetFadeDurationInterval=_e(1e3),k),Ba=class{constructor(e){this.layerView=e,this.type=0,this.slicePlaneEnabled=!1,this.isGround=!1,this._ellipsoidLocalRayOrigin=O(),this._ellipsoidLocalRayDir=O(),this.intersectionNormal=O(),this.intersectionRayDir=O(),this.intersectionPlane=zi(),this.layerViewUid=e.uid;const t=e.view.viewingMode,i=(e.useEsriCrs?e.fullExtentInLocalViewSpatialReference:e.layer.fullExtent?Ei(e.layer.fullExtent,e.view.renderSpatialReference):void 0)??e.view.extent,a=$i(i);this._bvh=Ta(t,a)}destroy(){this._bvh.destroy()}addTile(e){this._bvh.addTile(e)}removeTile(e){this._bvh.removeTile(e)}intersect(e,t,i,a,s,r){const{intersectionRayDir:o,intersectionPlane:u,layerViewUid:l,intersectionNormal:d}=this,c=Oi(i,a);Pt(o,a,i);const g=1/Bi(o);qe(o,o,g),Vi(d,o),qi(u,o[0],o[1],o[2],-ki(o,i));const h=new ke,p=new ke,P=e.options.store,y=P===0,b=P===2,A=P===1||b,T=b?new Array:null,R=(f,m,w,S,E,v,$,j)=>{const W=f.point??(f.point=O());W[0]=w,W[1]=S,W[2]=E,f.dist=m,f.normal=d;const H=f.outwardDirection??(f.outwardDirection=O()),N=v*v+$*$+j*j;if(N>0){const X=1/Math.sqrt(N);H[0]=v*X,H[1]=$*X,H[2]=j*X}else H[0]=d[0],H[1]=d[1],H[2]=d[2];return f.layerViewUid=l,f},G=i[0],M=i[1],F=i[2],U=o[0],I=o[1],B=o[2],_=this.layerView.clippingBox,D=f=>{const{relativePositions:m,packedRotations:w,packedOpacityScaledScales:S,gaussianCount:E,obb:v,maxSplatMbsRadiusSquared:$}=f,j=v.centerX,W=v.centerY,H=v.centerZ;let N=-1;const X=_[0],te=_[1],Pe=_[2],ce=_[3],ue=_[4],ne=_[5];for(let Z=0,ee=0;Z<E;Z++,ee+=3){const Q=m[ee]+j,re=m[ee+1]+W,J=m[ee+2]+H;if(Q<X||re<te||J<Pe||Q>ce||re>ue||J>ne)continue;const q=Q-G,ie=re-M,me=J-F,de=q*U+ie*I+me*B;if(de<0&&de*de>$)continue;const Fe=de<0?0:de;if(q*q+ie*ie+me*me-Fe*Fe>$||y&&h.dist!=null&&(N<0&&(N=Math.sqrt($)),Math.max(de-N,0)*g>=h.dist))continue;const ge=this._intersectGaussianEllipsoid(q,ie,me,U,I,B,w[Z],S[Z]);if(ge<0)continue;const oe=ge*g;if(t!=null&&!t(i,a,oe))continue;const Te=h.dist==null||oe<h.dist,De=A&&(p.dist==null||oe>p.dist);if(!Te&&!De&&!b)continue;const Re=U*ge,Me=I*ge,Ae=B*ge,Ie=G+Re,rt=M+Me,ot=F+Ae,lt=Re-q,ct=Me-ie,ut=Ae-me;if(Te&&R(h,oe,Ie,rt,ot,lt,ct,ut),De&&R(p,oe,Ie,rt,ot,lt,ct,ut),b){const Si=new ke;T.push(R(Si,oe,Ie,rt,ot,lt,ct,ut))}}},K=f=>{const{relativePositions:m,packedRotations:w,packedOpacityScaledScales:S,gaussianCount:E,obb:v,maxSplatMbsRadiusSquared:$}=f,j=v.centerX,W=v.centerY,H=v.centerZ;let N=-1;const X=G-j,te=M-W,Pe=F-H;for(let ce=0,ue=0;ce<E;ce++,ue+=3){const ne=m[ue]-X,Z=m[ue+1]-te,ee=m[ue+2]-Pe,Q=ne*U+Z*I+ee*B;if(Q<0&&Q*Q>$)continue;const re=Q<0?0:Q;if(ne*ne+Z*Z+ee*ee-re*re>$||y&&h.dist!=null&&(N<0&&(N=Math.sqrt($)),Math.max(Q-N,0)*g>=h.dist))continue;const J=this._intersectGaussianEllipsoid(ne,Z,ee,U,I,B,w[ce],S[ce]);if(J<0)continue;const q=J*g;if(t!=null&&!t(i,a,q))continue;const ie=h.dist==null||q<h.dist,me=A&&(p.dist==null||q>p.dist);if(!ie&&!me&&!b)continue;const de=U*J,Fe=I*J,ge=B*J,oe=G+de,Te=M+Fe,De=F+ge,Re=de-ne,Me=Fe-Z,Ae=ge-ee;if(ie&&R(h,q,oe,Te,De,Re,Me,Ae),me&&R(p,q,oe,Te,De,Re,Me,Ae),b){const Ie=new ke;T.push(R(Ie,q,oe,Te,De,Re,Me,Ae))}}},Y=(f,m)=>{const{min:w,max:S}=f.obb.signedDistanceRangePlane(u);if(S<0)return;const E=w*g;if(!(y&&h.dist!=null&&h.dist<E)){if(h.dist!=null&&p.dist!=null){const v=S*g;if(h.dist<E&&p.dist>v)return}m?D(f):K(f)}},V=f=>{Y(f,!1)},L=f=>{const m=f.boundingBox;mt(m,_)&&Y(f,!Hi(_,m))};this._bvh.forEachTileIntersectingRay(i,a,_!=null?L:V,r);const z=(f,m)=>{const{layerViewUid:w}=m,S=new ji(m.point,m.outwardDirection,w);f.set(0,S,m.dist,m.normal)};if(Yt(h)){const f=e.results.min;(f.distance==null||h.dist<f.distance)&&z(f,h)}if(Yt(p)&&A){const f=e.results.max;(f.distance==null||p.dist>f.distance)&&z(f,p)}if(b&&T?.length)for(const f of T){const m=new Li(c);z(m,f),e.results.all.push(m)}}_intersectGaussianEllipsoid(e,t,i,a,s,r,o,u){const l=o>>>30,d=1023&o,c=o>>>10&1023,g=o>>>20&1023,h=(d&He)*pt*(1-2*(d>>>9&1)),p=(c&He)*pt*(1-2*(c>>>9&1)),P=(g&He)*pt*(1-2*(g>>>9&1));let y,b,A,T;const R=h*h+p*p+P*P,G=Math.sqrt(Math.max(0,1-R));switch(l){case 0:y=G,b=P,A=p,T=h;break;case 1:y=P,b=G,A=p,T=h;break;case 2:y=P,b=p,A=G,T=h;break;default:y=P,b=p,A=h,T=G}const M=this._ellipsoidLocalRayOrigin;M[0]=-e,M[1]=-t,M[2]=-i,Ot(M,M,-y,-b,-A,T);const F=this._ellipsoidLocalRayDir;F[0]=a,F[1]=s,F[2]=r,Ot(F,F,-y,-b,-A,T);const U=ft[255&u],I=ft[u>>>8&255],B=ft[u>>>16],_=M[0]*U,D=M[1]*I,K=M[2]*B,Y=_*_+D*D+K*K;if(Y<=1)return 0;const V=F[0]*U,L=F[1]*I,z=F[2]*B,f=V*V+L*L+z*z,m=_*V+D*L+K*z;if(m>0)return Xt;const w=m*m-f*(Y-1);return w<0?Xt:(-m-Math.sqrt(w))/f}getElevationRange(e){return this._bvh.getElevationRangeIntersectingSphere(e)??new gt(0,0)}};function Yt(n){return n.dist!=null&&n.point!=null}class ke{constructor(){this.point=null,this.dist=null,this.normal=null,this.outwardDirection=null,this.layerViewUid=""}}const He=511,pt=Math.SQRT1_2/He,Xt=-1,Va=3,ft=(()=>{const n=new Float64Array(256);for(let e=0;e<n.length;e++)n[e]=Math.exp(10-e/16)/Va;return n})();let qa=class{constructor(e,t,i,a,s,r,o,u,l,d){this.handle=e,this.obb=t,this.gaussianAtlasIndices=i,this.pageIds=a,this.relativePositions=s,this.packedRotations=r,this.packedOpacityScaledScales=o,this.gaussianCount=u,this.maxSplatMbsRadiusSquared=l,this.elevationRange=d,this.bvhIntersectionGeneration=0,this.lifecycleState=0,this.cullingRevision=-1,this.cullingVisible=!1,this.fadeDirection=0,this.opacityModifier=0,this.usedMemory=Je(this.gaussianAtlasIndices,this.pageIds,this.relativePositions,this.packedRotations,this.packedOpacityScaledScales);const c=O();t.getCenter(c),this.obbCenterX=c[0],this.obbCenterY=c[1],this.obbCenterZ=c[2];const g=t.radius??-1;this._mbsRadius=g;const h=g<0?-1:g*g;this._mbsRadiusSquared=h;const p=t.halfSize;this._obbShortestHalfsize=p?Math.min(p[0],p[1],p[2]):0;const P=et();t.toAaBoundingBox(P),this.boundingBox=P;const y=g>=0?g:.5*Wi(P);this.paddedMbsRadius=y+Math.sqrt(Math.max(0,l))}boundingVolumeIntersectsRay(e,t){if(!this.obb)return!0;const{obbCenterX:i,obbCenterY:a,obbCenterZ:s}=this,r=i-e[0],o=a-e[1],u=s-e[2],l=r*t[0]+o*t[1]+u*t[2],d=r*r+o*o+u*u-l*l;return(this._mbsRadiusSquared<0||d<=this._mbsRadiusSquared)&&this.obb.intersectRay(e,t)}boundingVolumeIntersectsSphere(e){const t=this._mbsRadius;if(t<0)return!0;const i=e.center,a=e.radius,s=t+a,r=this.obbCenterX-i[0];if(r>s)return!1;const o=this.obbCenterY-i[1];if(o>s)return!1;const u=this.obbCenterZ-i[2];if(u>s)return!1;const l=r*r+o*o+u*u;return l>s*s?!1:l<=(this._obbShortestHalfsize+a)**2?!0:Math.sqrt(l)+t<=a||(this.obb?.intersectSphere(e)??!0)}};function hi(n){n.code.add(x`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 scaledRotation = scaleMatrix * rotation;
mat3 covariance3D = transpose(scaledRotation) * scaledRotation;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeGaussianCovariance2D(vec3 viewSpaceCenter, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(viewSpaceCenter, 1);
vec2 clampLimit = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -clampLimit, clampLimit) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 covarianceProjection = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(covarianceProjection) * transpose(covariance3D) * covarianceProjection;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}
void computePackedGaussianCovariance3D(uvec4 packedGaussian, out vec3 covarianceA, out vec3 covarianceB) {
vec3 scale = unpackScale(packedGaussian);
vec4 quaternion = unpackQuaternion(packedGaussian);
mat3 rotation = quaternionToRotationMatrix(quaternion);
computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);
}`)}function Ye(n){n.code.add(x`float computeGaussianCovarianceDeterminant(vec3 covariance2D) {
return covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;
}
vec2 computeGaussianCovarianceEigenvalues(vec3 covariance2D) {
float mid = 0.5 * (covariance2D.x + covariance2D.z);
float radius = length(vec2((covariance2D.x - covariance2D.z) * 0.5, covariance2D.y));
return vec2(mid + radius, mid - radius);
}
vec2 computeGaussianAxisLengths(vec2 eigenvalues, float gaussianEllipseThreshold) {
return ceil(sqrt(eigenvalues * gaussianEllipseThreshold));
}
float computeGaussianEllipseThreshold(float gaussianLogAlphaCutoff) {
return max(0.0, -2.0 * gaussianLogAlphaCutoff);
}
bool rejectGaussianByMinimumRadius(float maxRadius, float opacity, float minSplatRadius) {
return minSplatRadius > 0.0 && maxRadius * opacity < minSplatRadius;
}
bool rejectGaussianByScreenBounds(vec2 ndcPosition, float maxRadius, vec2 clipSpacePixelScale) {
vec2 radiusNDC = maxRadius * clipSpacePixelScale;
return any(greaterThan(abs(ndcPosition) - radiusNDC, vec2(1.0)));
}
vec2 computeGaussianMajorAxisDirection(vec3 covariance2D, float majorEigenvalue) {
return normalize(vec2(covariance2D.y, majorEigenvalue - covariance2D.x));
}
vec2 computeGaussianUnitQuadCorner(int vertexID) {
return vec2((vertexID << 1) & 2, vertexID & 2) - 1.0;
}
vec2 computeGaussianQuadOffset(vec3 covariance2D, vec2 eigenvalues, vec2 axisLengths, int vertexID) {
vec2 majorAxisDirection = computeGaussianMajorAxisDirection(covariance2D, eigenvalues.x);
vec2 majorAxis = axisLengths.x * majorAxisDirection;
vec2 minorAxis = axisLengths.y * vec2(majorAxisDirection.y, -majorAxisDirection.x);
vec2 corner = computeGaussianUnitQuadCorner(vertexID);
return corner.x * majorAxis + corner.y * minorAxis;
}
vec3 computeGaussianConic(vec3 covariance2D, float determinant) {
return vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * (1.0 / determinant);
}
float evaluateGaussianExponent(vec3 conic, vec2 offsetFromCenter) {
float x = offsetFromCenter.x;
float y = offsetFromCenter.y;
return -0.5 * dot(conic, vec3(x * x, 2.0 * x * y, y * y));
}`)}function pi(n){n.code.add(x`
    uint fetchOrderedGaussianIndex(uint instanceID) {
      uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
      uint x = instanceID % orderTextureWidth;
      uint y = instanceID / orderTextureWidth;

      return texelFetch(splatOrderTexture, ivec2(x, y), 0).r;
    }

    uvec4 fetchPackedGaussian(uint gaussianIndex) {
      uint gaussianIndexX = gaussianIndex & ${Zt}u;
      uint gaussianIndexY = gaussianIndex >> ${Qt}u;

      return texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);
    }

    uvec4 fetchPackedGaussianHeader(uint gaussianIndex) {
      uint headerIndex = gaussianIndex | ${ka}u;
      uint headerIndexX = headerIndex & ${Zt}u;
      uint headerIndexY = headerIndex >> ${Qt}u;

      return texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);
    }

    vec3 fetchGaussianCameraRelativePosition(uint gaussianIndex, uvec4 packedGaussian) {
      uvec4 packedHeader = fetchPackedGaussianHeader(gaussianIndex);
      vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

      return unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition);
    }

    uint fetchGaussianPageIndex(uint gaussianIndex) {
      return gaussianIndex >> ${La}u;
    }
  `)}const Zt=""+(se-1),Qt=`${Math.log2(se)}`,ka=""+(ye-1),La=`${Math.log2(ye)}`;let fi=class extends Tt{constructor(){super(...arguments),this.tileCameraPosition=O(),this.cameraDelta=O()}};function mi(n){n.code.add(x`float unpackOpacity(uvec4 packedGaussian) {
return float((packedGaussian.w >> 24u) & 0xffu) / 255.0;
}
vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),n.code.add(x`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),n.code.add(x`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),n.code.add(x`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),n.uniforms.add(new xe("tileCameraPosition",e=>e.tileCameraPosition),new xe("cameraDelta",e=>e.cameraDelta)).code.add(x`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xfu));
vec3 delta = tileOrigin.xyz - tileCameraPosition;
vec3 cameraRelativePosition = position * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function gi(n){n.code.add(x`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}function vi(n){n.code.add(x`vec3 encodeNormalizedDepthToRGB(float normalizedDepth) {
float depth24 = normalizedDepth * 16777215.0;
float high = floor(depth24 / 65536.0);
depth24 -= high * 65536.0;
float mid = floor(depth24 / 256.0);
float low = depth24 - mid * 256.0;
return vec3(high, mid, low) / 255.0;
}`),n.code.add(x`float decodeRGBToNormalizedDepth(vec3 rgb) {
rgb *= 255.0;
float depth = rgb.r * 65536.0 + rgb.g * 256.0 + rgb.b;
depth /= 16777215.0;
return depth;
}`)}class le extends Ni{constructor(e){super(),this.spherical=e,this.alphaCutoff=1,this.fadingEnabled=!1,this.clippingEnabled=!1,this.receiveShadows=!1,this.hasShadowHighlights=!1,this.output=0,this.hasEmission=!1,this.receiveAmbientOcclusion=!1,this.receiveGlobalIllumination=!1,this.pbrMode=0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!1,this.hasColorTexture=!0}}function Ha(n){switch(n){case 2:return .005;case 0:return .05;default:return .01}}C([he({count:3})],le.prototype,"alphaCutoff",void 0),C([he()],le.prototype,"fadingEnabled",void 0),C([he()],le.prototype,"clippingEnabled",void 0),C([he()],le.prototype,"receiveShadows",void 0),C([he()],le.prototype,"hasShadowHighlights",void 0),C([he({count:12})],le.prototype,"output",void 0),C([he()],le.prototype,"receiveAmbientOcclusion",void 0),C([he()],le.prototype,"receiveGlobalIllumination",void 0);class Gt extends fi{constructor(){super(...arguments),this.clipMinCameraRelative=O(),this.clipMaxCameraRelative=O(),this.focalLength=-1,this.minSplatRadius=-1,this.tanFov=Dt(),this.origin=O()}}function _i(n){const{clippingEnabled:e,hasSlicePlane:t,receiveShadows:i,spherical:a}=n,s=new tt;s.varyings.add("vColor","vec4"),s.varyings.add("conicOpacity","vec4"),s.varyings.add("gaussianLogAlphaCutoff","float"),s.varyings.add("offsetFromCenter","vec2"),Jt(n)&&s.varyings.add("fragmentPositionCameraRelative","vec3"),s.vertex.uniforms.add(new Be("splatOrderTexture",c=>c.splatOrder),new Be("splatFadingTexture",c=>c.splatFading),new Be("splatAtlasTexture",c=>c.splatAtlas),new vt("focalLength",c=>c.focalLength),new vt("minSplatRadius",c=>c.minSplatRadius),new Ui("tanFov",c=>c.tanFov),new We("inverseScreenSize",({camera:c})=>Rt(ja,1/c.fullWidth,1/c.fullHeight)),new Ne("proj",c=>c.camera.projectionMatrix),new Ne("view",c=>c.camera.viewMatrix),new We("nearFar",c=>c.camera.nearFar),new Bt("cameraPosition",c=>c.camera.eye)),e&&(s.vertex.uniforms.add(new xe("clipMin",c=>c.clipMinCameraRelative),new xe("clipMax",c=>c.clipMaxCameraRelative)),s.fragment.uniforms.add(new xe("clipMin",c=>c.clipMinCameraRelative),new xe("clipMax",c=>c.clipMaxCameraRelative))),s.vertex.include(mi),s.vertex.include(pi),s.vertex.include(gi),s.vertex.include(hi),s.vertex.include(Ye),s.vertex.include(_t,n),i?(s.fragment.uniforms.add(new Bt("cameraPosition",c=>c.camera.eye)),s.fragment.include(Vt,n)):s.vertex.include(Vt,n),s.include(Yi,n),Xi(i?s.fragment:s.vertex),Zi(i?s.fragment:s.vertex),i&&s.include(Qi,n),s.outputs.add("fragColor","vec4",0),s.outputs.add("fragDepthColor","vec4",1);const r=Ha(n.alphaCutoff),o=Math.log(r),u=x`float groundLightAlignment = dot(groundNormal, mainLightDirection);
float additionalAmbientScale = additionalDirectedAmbientLight(groundLightAlignment);
vec3 additionalLight = mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;`,l=x`
    vec3 groundNormal = ${a?x`normalize(cameraRelativePosition + cameraPosition)`:x`vec3(0.0, 0.0, 1.0)`};
    ${u}
    float shadow = ${a?x`lightingGlobalFactor * (1.0 - additionalAmbientScale)`:x`0.0`};
    vColor.rgb = evaluateSceneLighting(groundNormal, vColor.rgb, shadow, 0.0, additionalLight);
  `,d=x`
    vec3 groundNormal = ${a?x`normalize(fragmentPositionCameraRelative + cameraPosition)`:x`vec3(0.0, 0.0, 1.0)`};
    ${u}
    float shadow = readShadow(additionalAmbientScale, fragmentPositionCameraRelative);
    shadedColor = evaluateSceneLighting(groundNormal, vColor.rgb, shadow, 0.0, additionalLight);
  `;return s.vertex.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);
    uint pageNum = fetchGaussianPageIndex(gaussianIndex);

    // Unpack color first so very transparent splats can discard before fetching the page header.
    vColor = unpackColor(packedGaussian);

    // Apply per-page fading before the early alpha rejection.
    ${ae(n.fadingEnabled,`
      uint fadingTextureWidth = uint(textureSize(splatFadingTexture, 0).x);
      uint fadeX = pageNum  % fadingTextureWidth;
      uint fadeY = pageNum  / fadingTextureWidth;
      uint opacityModifierByte = texelFetch(splatFadingTexture, ivec2(fadeX , fadeY), 0).r;
      float opacityModifier = float(opacityModifierByte) / 255.0;
      vColor.a *= opacityModifier;
      `)}

    // Set default position outside clip space for early returns.
    gl_Position = ${si};

    if (vColor.a < ${r}) {
      return;
    }

    // Delay the page header fetch until the splat survives the opacity reject.
    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);

    ${ae(e,`
      if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||
        cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {
        return;
      }
      `)}

    ${ae(t,`if (rejectBySlice(cameraRelativePosition)) {
        return;
      }`)}

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    vec3 covarianceA;
    vec3 covarianceB;
    computePackedGaussianCovariance3D(packedGaussian, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeGaussianCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);

    // Reject degenerate covariances before inverting them into conic coefficients.
    float determinant = computeGaussianCovarianceDeterminant(covariance2D);
    if (determinant <= 0.) {
      return;
    }

    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);

    // Fold the per-splat opacity into the log cutoff so the vertex-side ellipse
    // bound matches the fragment alpha discard after fading.
    gaussianLogAlphaCutoff = ${o} - log(vColor.a);
    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);
    vec2 axisLengths = computeGaussianAxisLengths(eigenvalues, gaussianEllipseThreshold);
    float maxRadius = max(axisLengths.x, axisLengths.y);

    // Ignore Gaussians with very small contribution, with tolerance based on the quality profile.
    if (rejectGaussianByMinimumRadius(maxRadius, vColor.a, minSplatRadius)) {
      return;
    }

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;
    vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;

    // Cull splats whose screen-space ellipse cannot touch the viewport.
    if (rejectGaussianByScreenBounds(ndcPos.xy, maxRadius, clipSpacePixelScale)) {
      return;
    }

    offsetFromCenter = computeGaussianQuadOffset(covariance2D, eigenvalues, axisLengths, gl_VertexID);

    ${ae(Jt(n),`float viewSpacePixelScale = -viewPos.z / focalLength;
      vec3 fragmentViewOffset = vec3(offsetFromCenter * viewSpacePixelScale, 0.0);
      fragmentPositionCameraRelative = cameraRelativePosition + transpose(mat3(view)) * fragmentViewOffset;`)}

    // Store conic coefficients with opacity for fragment-side falloff.
    vec3 conic = computeGaussianConic(covariance2D, determinant);
    conicOpacity = vec4(conic, vColor.a);

    // Handle environment lighting per vertex when no shadow map is active.
    // When shadows are received, defer lighting to the fragment shader for crisp shadow borders.
  ${ae(i,"forwardLinearDepth(-viewPos.z);",l)}

    // Place this quad corner in clip space around the projected splat center.
    vec2 quadClipPosition = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;

    gl_Position = vec4(quadClipPosition, ndcPos.z, 1.0);

  `),s.fragment.include(vi),s.fragment.include(Ye),s.fragment.include(_t,n),s.fragment.main.add(`
    ${ae(e,`if (fragmentPositionCameraRelative.x < clipMin.x || fragmentPositionCameraRelative.y < clipMin.y || fragmentPositionCameraRelative.z < clipMin.z ||
        fragmentPositionCameraRelative.x > clipMax.x || fragmentPositionCameraRelative.y > clipMax.y || fragmentPositionCameraRelative.z > clipMax.z) {
        discard;
      }`)}
    ${ae(t,"if (rejectBySlice(fragmentPositionCameraRelative)) { discard; }")}

    float gaussianExponent = evaluateGaussianExponent(conicOpacity.xyz, offsetFromCenter);

    // A positive exponent indicates alpha > 1, which should not happen.
    // We also early check the opacity-aware alpha cutoff to avoid unnecessary exp().
    if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);

    // Cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians.
    float alpha = min(.99f, conicOpacity.w * gaussianFalloff);

    vec3 shadedColor = vColor.rgb;
  ${ae(i,d)}
    fragColor = vec4(shadedColor * alpha, alpha);

    // We simulate first hit based depth using 0.25 as the opacity threshold.
    // This works because we render in front-to-back order,
    // i.e. the first hit that counts completely saturates the alpha channel
    // and further splats do not contribute.
    float depthHit = step(0.25, alpha);
    float normalizedDepth = gl_FragCoord.z;
    fragDepthColor = vec4(encodeNormalizedDepthToRGB(normalizedDepth) * depthHit, depthHit);
  `),s}function Jt(n){const{clippingEnabled:e,hasSlicePlane:t,receiveShadows:i}=n;return i||t||e}const ja=Dt(),Wa=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:Gt,build:_i},Symbol.toStringTag,{value:"Module"}));let Ft=class extends Tt{};function xi(n){const e=new tt;e.include(ni);const{hasEmission:t}=n,i=e.fragment;return t&&i.include(Ji,n),i.uniforms.add(new Le("colorTexture",a=>a.color),new Le("splatOutputColor",a=>a.splatColor)),t&&i.uniforms.add(new Le("emissionTexture",a=>a.emission)),e.outputs.add("fragColor","vec4",0),t&&e.outputs.add("fragEmission","vec4",1),e.fragment.main.add(x`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${ae(t,x`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, 1.0 - srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),e}const Na=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:Ft,build:xi},Symbol.toStringTag,{value:"Module"}));let Xe=class extends it{constructor(){super(...arguments),this.shader=new at(Na,()=>st(()=>Promise.resolve().then(()=>Ka),void 0,import.meta.url))}initializePipeline(){return nt({colorWrite:ri,depthTest:null,depthWrite:Mt})}};Xe=C([Ce("esri.views.3d.webgl-engine.shaders.GaussianSplatCompositionTechnique")],Xe);class yi extends Ki{constructor(){super(...arguments),this.hasEmission=!1}}C([he()],yi.prototype,"hasEmission",void 0);class It extends Tt{}function bi(){const n=new tt;n.include(ni);const e=n.fragment;return e.uniforms.add(new Le("splatOutputDepth",t=>t.splatDepth)),e.include(vi),e.main.add(x`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),n}const Ua=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:It,build:bi},Symbol.toStringTag,{value:"Module"}));let Ze=class extends it{constructor(){super(...arguments),this.shader=new at(Ua,()=>st(()=>Promise.resolve().then(()=>es),void 0,import.meta.url))}initializePipeline(){return nt({colorWrite:null,depthTest:{func:515},depthWrite:Mt})}};Ze=C([Ce("esri.views.3d.webgl-engine.shaders.GaussianSplatDepthCompositionTechnique")],Ze);let Qe=class extends it{constructor(){super(...arguments),this.shader=new at(Wa,()=>st(()=>Promise.resolve().then(()=>ts),void 0,import.meta.url))}initializePipeline(){return nt({blending:ea(773,773,1,1,32774,32774),depthTest:{func:515},colorWrite:ri})}};Qe=C([Ce("esri.views.3d.webgl-engine.shaders.GaussianSplatTechnique")],Qe);var je,we;let be=(we=class extends oi{constructor(e){super(e),this.produces=li.GAUSSIAN_SPLAT,this._slicePlaneEnabled=!1,this.layerView=null,this._passParameters=new Gt,this._compositionPassParameters=new Ft,this._depthCompositionPassParameters=new It,this._compositionConfiguration=new yi,this._clipBox=et(),this._previousCameraDirection=O(),this._previousSortRequestCameraDirection=O(),this._tileCullingRevision=0,this._sortRequestDirectionEpsilon=.01,this._directionChangeEpsilon=.001,this._configuration=new le(e.view.state.isGlobal),qt(this._clipBox,Ee)}async initialize(){this.addHandles([pe(()=>this.view.state.camera,()=>this._onCameraChange()),pe(()=>this.view.state.mode===2,()=>this.requestRender(1))])}precompile(){this._updateConfigurations(),this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=this.bindParameters.hasOpaqueEmission,this.techniques.precompile(Qe,this._configuration),this.techniques.precompile(Xe,this._compositionConfiguration),this.techniques.precompile(Ze)}render(e){const t=e.find(({name:p})=>p===this.produces);if(this._updateConfigurations(),this._handleFading(),!this._data.visibleGaussians||!this._data.orderTexture.texture||!this._data.textureAtlas.texture)return t;const i=t.getAttachment(ze);this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=i!=null;const{fullWidth:a,fullHeight:s}=this.bindParameters.camera;this._prepareParameters(s,a);const r=this.renderingContext,o=this.fboCache,u=o.acquire(a,s,"gaussian color output"),l=t.getAttachment(kt);u.attachDepth(l);const d=this.techniques.get(Qe,this._configuration);this._renderGaussianColorAndDepth(u,d);const c=o.acquire(a,s,this.produces);this._depthCompositionPassParameters.splatDepth=u.getTexture(ze),c.attachDepth(t.getAttachment(kt)),r.bindFramebuffer(c.fbo);const g=this.techniques.get(Ze);r.bindTechnique(g,this.bindParameters,this._depthCompositionPassParameters),r.screen.draw(),this._compositionPassParameters.color=t.getTexture(),this._compositionPassParameters.splatColor=u.getTexture(),i?(c.acquireColor(ze,8,"emissive"),this._compositionPassParameters.emission=t.getTexture(ze)):this._compositionPassParameters.emission=null,r.bindFramebuffer(c.fbo);const h=this.techniques.get(Xe,this._compositionConfiguration);return r.bindTechnique(h,this.bindParameters,this._compositionPassParameters),r.screen.draw(),u.release(),c}get slicePlaneEnabled(){return this._slicePlaneEnabled}set slicePlaneEnabled(e){this._slicePlaneEnabled!==e&&(this._slicePlaneEnabled=e,this.requestRender(1))}set clippingBox(e){const t=e||Ee;this._hasSameClipBox(t)||(qt(this._clipBox,t),this._tileCullingRevision=Lt(this._tileCullingRevision,1),this._data.requestSort(),this.requestRender(1))}get clippingBox(){return this._clippingEnabled?this._clipBox:null}get tileCullingRevision(){return this._tileCullingRevision}get _clippingEnabled(){return!Ht(this._clipBox,Ee,(e,t)=>e===t)}get _isIdle(){return this.view.state.mode===2}get _data(){return this.layerView.data}get _fadeHelper(){return this.layerView.fadeHelper}_updateConfigurations(){const{idleMinimumOpacity:e,nonIdleMinimumOpacity:t}=this.view.qualitySettings.gaussianSplat;this._configuration.alphaCutoff=this._isIdle?e:t,this._configuration.fadingEnabled=this._fadeHelper.fadingEnabled,this._configuration.receiveShadows=this.bindParameters.shadowMap.ready,this._configuration.hasShadowHighlights=this._configuration.receiveShadows&&this.bindParameters.hasShadowHighlights,this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this._slicePlaneEnabled&&this.bindParameters.slicePlane!=null}_onCameraChange(){this._tileCullingRevision=Lt(this._tileCullingRevision,1);const e=this.view.state.camera.ray.direction;this._directionChanged(e)&&(Oe(this._previousCameraDirection,e),this._shouldRequestSort(e)&&this._data.requestSort()&&Oe(this._previousSortRequestCameraDirection,e))}_directionChanged(e){return Math.abs(e[0]-this._previousCameraDirection[0])>this._directionChangeEpsilon||Math.abs(e[1]-this._previousCameraDirection[1])>this._directionChangeEpsilon||Math.abs(e[2]-this._previousCameraDirection[2])>this._directionChangeEpsilon}_shouldRequestSort(e){return Math.abs(e[0]-this._previousSortRequestCameraDirection[0])>this._sortRequestDirectionEpsilon||Math.abs(e[1]-this._previousSortRequestCameraDirection[1])>this._sortRequestDirectionEpsilon||Math.abs(e[2]-this._previousSortRequestCameraDirection[2])>this._sortRequestDirectionEpsilon}_prepareParameters(e,t){this._passParameters.splatOrder=this._data.orderTexture.texture,this._passParameters.splatFading=this._data.fadingTexture.texture,this._passParameters.splatAtlas=this._data.textureAtlas.texture;const i=Math.tan(.5*this.camera.fovY),a=i/e*t;Rt(this._passParameters.tanFov,a,i),this._passParameters.focalLength=e/(2*i);const s=this.view.qualitySettings.gaussianSplat,r=this._isIdle?s.idleMinimumSplatPixelRadius:s.nonIdleMinimumSplatPixelRadius;this._passParameters.minSplatRadius=r*Math.sqrt(t*e)/Math.sqrt(2073600),Oe(this._passParameters.origin,this.bindParameters.camera.eye),this._prepareHighPrecisionCameraPosition(),this._updateSlicePlaneLocalOrigin(),this._updateClipUniforms()}_updateClipUniforms(){const e=this.clippingBox||Ee,[t,i,a,s,r,o]=e,[u,l,d]=this.camera.eye,{clipMinCameraRelative:c,clipMaxCameraRelative:g}=this._passParameters;Ve(c,t-u,i-l,a-d),Ve(g,s-u,r-l,o-d)}_updateSlicePlaneLocalOrigin(){this._passParameters.slicePlaneLocalOrigin=this.camera.eye}_hasSameClipBox(e){return Ht(this._clipBox,e,(t,i)=>t===i)}_renderGaussianColorAndDepth(e,t){const i=this.renderingContext;e.acquireColor(ze,5,"gaussian depth output"),i.bindFramebuffer(e.fbo),i.setClearColor(0,0,0,0),i.clear(16384),this.renderingContext.bindTechnique(t,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(ci.TRIANGLE_STRIP,0,4,this._data.visibleGaussians)}_prepareHighPrecisionCameraPosition(){qe(this._passParameters.tileCameraPosition,this.camera.eye,1/je.tileSize),ui(this._passParameters.tileCameraPosition,this._passParameters.tileCameraPosition),qe(this._passParameters.cameraDelta,this._passParameters.tileCameraPosition,je.tileSize),Pt(this._passParameters.cameraDelta,this.camera.eye,this._passParameters.cameraDelta)}_handleFading(){if(this._fadeHelper.numFadingTiles===0)return void(this._previousFrameStart=null);this._previousFrameStart??=this.view.stage.renderer.renderContext.time;const e=this.view.stage?.renderer.renderContext.time-this._previousFrameStart;this._fadeHelper.updateAllTileFading(e),this._previousFrameStart=this.view.stage.renderer.renderContext.time,this._data.fadingTexture.updateTexture(this._data.textureAtlas.pageAllocator.pageCount)}},je=we,we.tileSize=2.048,we);C([fe()],be.prototype,"produces",void 0),C([fe({constructOnly:!0})],be.prototype,"layerView",void 0),be=je=C([Ce("esri.views.3d.webgl-engine.lib.GaussianSplatRenderNode")],be);class zt extends fi{constructor(){super(...arguments),this.clipMinCameraRelative=O(),this.clipMaxCameraRelative=O(),this.minSplatRadius=-1}}function wi(n){const{clippingEnabled:e,hasSlicePlane:t}=n,i=new tt,{fragment:a,varyings:s,vertex:r}=i;s.add("conic","vec3"),s.add("gaussianLogAlphaCutoff","float"),s.add("offsetFromCenter","vec2"),r.uniforms.add(new Be("splatOrderTexture",l=>l.splatOrder),new Be("splatAtlasTexture",l=>l.splatAtlas),new vt("minSplatRadius",l=>l.minSplatRadius),new We("inverseScreenSize",({camera:l})=>Rt(Ya,1/l.fullWidth,1/l.fullHeight)),new Ne("proj",l=>l.camera.projectionMatrix),new Ne("view",l=>l.camera.viewMatrix),new We("nearFar",l=>l.camera.nearFar)),e&&r.uniforms.add(new xe("clipMin",l=>l.clipMinCameraRelative),new xe("clipMax",l=>l.clipMaxCameraRelative)),r.include(mi),r.include(pi),r.include(gi),r.include(hi),r.include(Ye),r.include(_t,n),r.code.add(x`float safeClipW(float clipW) {
return abs(clipW) < 1e-7 ? (clipW < 0.0 ? -1e-7 : 1e-7) : clipW;
}`),r.code.add(x`vec3 computeProjectivePixelGradient(
vec3 clipGradient,
vec3 clipWGradient,
float clipValue,
float safeW,
float invWSquared,
float halfScreenSize
) {
return (clipGradient * safeW - clipValue * clipWGradient) * invWSquared * halfScreenSize;
}`),r.code.add(x`vec3 multiplyCovariance3D(float[6] covariance3D, vec3 value) {
return vec3(
covariance3D[0] * value.x + covariance3D[1] * value.y + covariance3D[2] * value.z,
covariance3D[1] * value.x + covariance3D[3] * value.y + covariance3D[4] * value.z,
covariance3D[2] * value.x + covariance3D[4] * value.y + covariance3D[5] * value.z
);
}`),r.code.add(x`vec3 computeProjectiveCovariance2D(vec3 pixelXGradient, vec3 pixelYGradient, float[6] covariance3D, mat4 view) {
mat3 worldToView = transpose(mat3(view));
vec3 axisX = worldToView * pixelXGradient;
vec3 axisY = worldToView * pixelYGradient;
vec3 covarianceAxisX = multiplyCovariance3D(covariance3D, axisX);
vec3 covarianceAxisY = multiplyCovariance3D(covariance3D, axisY);
const float regularization = 0.3;
float covarianceXX = dot(axisX, covarianceAxisX) + regularization;
float covarianceXY = dot(axisX, covarianceAxisY);
float covarianceYY = dot(axisY, covarianceAxisY) + regularization;
return vec3(covarianceXX, covarianceXY, covarianceYY);
}`),r.code.add(x`float biasDepth(float linearDepth) {
const float bias = 80.0 * .000015259;
return min(linearDepth + bias, 1.0);
}`);const o=.25,u=Math.log(o);return r.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);

    float opacity = unpackOpacity(packedGaussian);

    gl_Position = ${si};

    if (opacity < ${o}) {
      return;
    }

    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);

    ${ae(e,x`if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||
cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {
return;
}`)}

    ${ae(t,x`if (rejectBySlice(cameraRelativePosition)) {
return;
}`)}

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1.0);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    vec3 covarianceA;
    vec3 covarianceB;
    computePackedGaussianCovariance3D(packedGaussian, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec4 projPos = proj * viewPos;
    float safeW = safeClipW(projPos.w);
    float invWSquared = 1.0 / (safeW * safeW);
    vec2 halfScreenSize = 0.5 / inverseScreenSize;
    float maxShadowSplatRadius = max(halfScreenSize.x, halfScreenSize.y);

    // Projection matrix columns are the clip-space derivatives with respect to view-space xyz.
    vec3 clipWGradient = vec3(proj[0][3], proj[1][3], proj[2][3]);
    vec3 pixelXGradient = computeProjectivePixelGradient(
      vec3(proj[0][0], proj[1][0], proj[2][0]),
      clipWGradient,
      projPos.x,
      safeW,
      invWSquared,
      halfScreenSize.x
    );
    vec3 pixelYGradient = computeProjectivePixelGradient(
      vec3(proj[0][1], proj[1][1], proj[2][1]),
      clipWGradient,
      projPos.y,
      safeW,
      invWSquared,
      halfScreenSize.y
    );
    vec3 covariance2D = computeProjectiveCovariance2D(pixelXGradient, pixelYGradient, covariance3D, view);

    float determinant = computeGaussianCovarianceDeterminant(covariance2D);
    if (determinant <= 0.0) {
      return;
    }

    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);

    gaussianLogAlphaCutoff = ${u} - log(opacity);
    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);
    vec2 axisLengths = computeGaussianAxisLengths(eigenvalues, gaussianEllipseThreshold);
    float maxRadius = max(axisLengths.x, axisLengths.y);

    // Avoid invalid/extremely large footprints.
    if (maxRadius < 0.0 || maxRadius > maxShadowSplatRadius) {
      return;
    }

    if (rejectGaussianByMinimumRadius(maxRadius, opacity, minSplatRadius)) {
      return;
    }

    vec3 ndcPos = projPos.xyz / safeW;
    vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;

    if (rejectGaussianByScreenBounds(ndcPos.xy, maxRadius, clipSpacePixelScale)) {
      return;
    }

    offsetFromCenter = computeGaussianQuadOffset(covariance2D, eigenvalues, axisLengths, gl_VertexID);
    conic = computeGaussianConic(covariance2D, determinant);
    float linearDepth = (-viewPos.z - nearFar.x) / (nearFar.y - nearFar.x);
    float biasedDepth = biasDepth(linearDepth);

    vec2 clipPos = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;
    gl_Position = vec4(clipPos, biasedDepth * 2.0 - 1.0, 1.0);
  `),a.include(Ye),a.main.add(x`float gaussianExponent = evaluateGaussianExponent(conic, offsetFromCenter);
if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
discard;
}`),i}const Ya=Dt(),Xa=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:zt,build:wi},Symbol.toStringTag,{value:"Module"}));let xt=class extends it{constructor(){super(...arguments),this.shader=new at(Xa,()=>st(()=>Promise.resolve().then(()=>is),void 0,import.meta.url))}initializePipeline(){return nt({colorWrite:null,depthTest:{func:515},depthWrite:Mt})}};xt=C([Ce("esri.views.3d.webgl-engine.shaders.GaussianSplatShadowTechnique")],xt);let $e=class extends oi{constructor(n){super(n),this.produces=li.SHADOW_CASTERS,this.layerView=null,this._passParameters=new zt,this._cameraPosition=O(),this._configuration=new le(n.view.state.isGlobal)}render(){const n=this.bindRenderTarget();return this._render(),n}queryDepthRange(n){return this.layerView.suspended?null:this._data.queryVisibleTileDepthRange(n,this.layerView.clippingBox)}get _data(){return this.layerView.data}get _clippingEnabled(){return this.layerView.clippingBox!=null}get _isIdle(){return this.view.state.mode===2}_render(){const n=this._data;if(this.layerView.suspended||n.visibleGaussians===0||!n.orderTexture.texture||!n.textureAtlas.texture)return;this._updateShadowConfigurations();const e=this.techniques.getCompiled(xt,this._configuration);e?(this._prepareShadowParameters(this.bindParameters.camera),this.renderingContext.bindTechnique(e,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(ci.TRIANGLE_STRIP,0,4,n.visibleGaussians)):this.requestRender(1)}_updateShadowConfigurations(){this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this.layerView.slicePlaneEnabled&&this.bindParameters.slicePlane!=null,this._configuration.output=this.bindParameters.output}_prepareShadowParameters(n){const e=this._data;this._passParameters.splatOrder=e.orderTexture.texture,this._passParameters.splatAtlas=e.textureAtlas.texture;const{fullHeight:t,fullWidth:i}=n,a=this.view.qualitySettings.gaussianSplat,s=this._isIdle?a.idleMinimumSplatPixelRadius:a.nonIdleMinimumSplatPixelRadius;this._passParameters.minSplatRadius=s*Math.sqrt(i*t)/Math.sqrt(2073600),this._updateShadowCameraPosition(n),this._prepareShadowHighPrecisionCameraPosition(),this._passParameters.slicePlaneLocalOrigin=this._cameraPosition,this._updateShadowClipUniforms()}_updateShadowClipUniforms(){const n=this.layerView.clippingBox||Ee,[e,t,i,a,s,r]=n,[o,u,l]=this._cameraPosition,{clipMinCameraRelative:d,clipMaxCameraRelative:c}=this._passParameters;Ve(d,e-o,t-u,i-l),Ve(c,a-o,s-u,r-l)}_prepareShadowHighPrecisionCameraPosition(){qe(this._passParameters.tileCameraPosition,this._cameraPosition,1/be.tileSize),ui(this._passParameters.tileCameraPosition,this._passParameters.tileCameraPosition),qe(this._passParameters.cameraDelta,this._passParameters.tileCameraPosition,be.tileSize),Pt(this._passParameters.cameraDelta,this._cameraPosition,this._passParameters.cameraDelta)}_updateShadowCameraPosition(n){const e=n.viewInverseTransposeMatrix;Ve(this._cameraPosition,e[3],e[7],e[11])}};C([fe()],$e.prototype,"produces",void 0),C([fe({constructOnly:!0})],$e.prototype,"layerView",void 0),$e=C([Ce("esri.views.3d.webgl-engine.lib.GaussianSplatShadowRenderNode")],$e);var yt;const Za=()=>ya.getLogger("esri.views.3d.layers.GaussianSplatLayerView3D"),Kt=3,Qa=Kt*Kt,ei=255,Ja=(()=>{const n=new Int16Array(ei+1);n[0]=-255;for(let e=1;e<n.length;e++)n[e]=Math.round(16*Math.log(e/ei));return n})();var Se;let ve=(Se=class extends Sa(Da){constructor(e){super(e),this.type="gaussian-splat-3d",this.ignoresMemoryFactor=!1,this._tileHandles=new Map,this._pageBuffer=new Uint32Array(Ma),this._tmpTilesWithChangedVisibility=new Array,this._currentLyr3dVisibilityChange=0,this._tileFadeInsAwaitingInitialSort=new Map,this._tileFadeOutsAwaitingInitialSort=new Map,this._fadeDurationPerVisibilityChange=new Map,this._tmpSortedTileHandles=new Set,this._createRenderableAbortController=new AbortController,this._wasmLayerId=-1,this._metersPerVCSUnit=1,this._usedTileMemory=0,this._cacheTileMemory=0,this._useEsriCrs=!1,this.fullExtentInLocalViewSpatialReference=null,this._suspendedHandle=null,this._conversionBuffer=new ArrayBuffer(4),this._u32View=new Uint32Array(this._conversionBuffer),this._f32View=new Float32Array(this._conversionBuffer);const t=e.view.resourceController;this._memCache=t.memoryController.newCache(`GaussianSplat-${this.uid}`,i=>this._deleteTile(i)),this._frameTask=t.scheduler.registerTask(ai.GAUSSIAN_SPLAT_TEXTURE_ATLAS)}get _clippingBox(){if(!this.view?.clippingArea)return null;const e=et();return ta(this.view.clippingArea,e,this.view.renderSpatialReference)?e:null}get clippingBox(){return this._renderNode?.clippingBox??null}initialize(){if(!this._canProjectWithoutEngine())throw ia("layer",this.layer.spatialReference.wkid,this.view.renderSpatialReference?.wkid);const e=aa(this).then(t=>{this._wasmLayerId=t,this._renderNode=new be({view:this.view,layerView:this}),this.data=new $a(this._renderNode,(i,a)=>this._onSortComplete(i,a),()=>this._freeInvisibleTiles()),this._shadowRenderNode=new $e({view:this.view,layerView:this}),this.fadeHelper=new Oa(this),this._intersectionHandler=new Ba(this),this.view.sceneIntersectionHelper.addIntersectionHandler(this._intersectionHandler),this._elevationProvider=new Ca({view:this.view,layerElevationSource:this,intersectionHandler:this._intersectionHandler}),this.view.elevationProvider.register(2,this._elevationProvider),this.addHandles([pe(()=>this.layer.elevationInfo,i=>this._elevationInfoChanged(i)),pe(()=>this.slicePlaneEnabled,i=>this._slicePlaneEnabledChanged(i),dt)]),this._suspendedHandle=pe(()=>this.suspended,i=>this._wasm?.setEnabled(this,!i),dt),this.addHandles([pe(()=>this._clippingBox,i=>this._renderNode.clippingBox=i,dt)]),this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians)});this.addHandles([pe(()=>this.view.qualitySettings.fadeDuration,t=>{const i=this.data;i&&(this.fadeHelper.onFadeDurationChanged(t),i.fadingTexture.updateTexture(i.textureAtlas.pageAllocator.pageCount))}),pe(()=>this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians,t=>this.setMaximumGaussianCount(t*this.view.quality)),pe(()=>this.view.quality,t=>this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians*t))]),this.addResolvingPromise(e)}get wasmLayerId(){return this._wasmLayerId}get metersPerVCSUnit(){return this._metersPerVCSUnit}get tileHandles(){return this._tileHandles}get _wasm(){return sa(this.view)}get usedMemory(){return this._usedTileMemory+(this.data?.usedMemory??0)}get cachedMemory(){return this._cacheTileMemory}get unloadedMemory(){return 0}get useEsriCrs(){return this._useEsriCrs}get elevationProvider(){return this._elevationProvider}get elevationOffset(){return jt(this.layer.elevationInfo)}get elevationRange(){const e=this.fullExtent;return e?.zmin&&e?.zmax?new gt(e.zmin,e.zmax):null}getElevationRange(e){return this._intersectionHandler.getElevationRange(e)}get fullExtent(){return this.layer.fullExtent}get visibleAtCurrentScale(){return na(this.layer.effectiveScaleRange,this.view.scale)}isUpdating(){const e=this._wasm;return!(this._wasmLayerId<0||e==null)&&(e.isUpdating(this._wasmLayerId)||this.data.updating||this.fadeHelper.updating)}updatingFlagChanged(){this.notifyChange("updating")}async createRenderable(e){if(this.destroyed||this.destroying)throw new Error("IntegratedMesh3DTilesLayerView3D: createRenderable called after destroy");const{meshData:t}=e;if(!ba(t))throw new Error("meshData not valid");const i=t.desc.prims[0],a=i.vertexCount;if(a===0)return Za().warnOnce("encountered tile with zero Gaussians"),()=>({memUsageBytes:0,numGaussians:0});const s=i.atrbs[0].view,r=i.atrbs[0].view.byteCount,o=i.atrbs[0].view.byteOffset;let u=null;if(s.type!=="U32")throw new Error("unexpected meshData.data format");u=new Uint32Array(t.data.buffer,o,r/4);const l=this.extractHeader(u),d=2.048,c=l.tileOrigin.x*d,g=l.tileOrigin.y*d,h=l.tileOrigin.z*d,p=t.desc;if(p.obb==null)throw new Error("meshData.desc.obb undefined");const P=p.obb.quaternion,y=new ra(p.obb.center,p.obb.halfSize,oa(...P)),b=this.view.state.isGlobal,A=b?la(this.view.spatialReference).radius:0,T={handle:e.handle,bufferView:u,totalGaussians:a,packedHeader:l.packedHeader,tileOrigin:{x:c,y:g,z:h},invPosScale:l.invPosScale,obb:y,origin:{x:y.centerX,y:y.centerY,z:y.centerZ},isGlobal:b,ellipsoidRadius:A},R=await this._frameTask.scheduleGenerator(G=>this._createRenderableTask(T,G),this._createRenderableAbortController.signal);return()=>R}*_createRenderableTask(e,t){const{handle:i,bufferView:a,totalGaussians:s,packedHeader:r,tileOrigin:o,invPosScale:u,obb:l,origin:d,isGlobal:c,ellipsoidRadius:g}=e,h=o.x,p=o.y,P=o.z,y=d.x,b=d.y,A=d.z,T=new Uint32Array(s),R=new Float32Array(3*s),G=new Uint32Array(s),M=new Uint32Array(s),F=new Array,U=Math.ceil(s/Ge);for(let w=0;w<U;w++){let S=this.data.textureAtlas.requestPage();if(S===null&&(this._freeInvisibleTiles(),S=this.data.textureAtlas.requestPage()),S===null)throw new Error("ran out of gaussian splat memory");F.push(S);const E=s-w*Ge,v=Math.min(E,Ge),$=w*Ge,j=ye*S;for(let te=0;te<v;te++)T[$+te]=j+te;const W=w*Ut;this._pageBuffer.set(a.subarray(W,W+v*Ue)),this._pageBuffer.set(r,Ut);const H=S*ye,N=H%se,X=Math.floor(H/se);this.data.textureAtlas.update(N,X,this._pageBuffer),t.madeProgress()&&(t=yield)}let I=1/0,B=-1/0,_=1/0,D=-1/0,K=0,Y=-1,V=0;for(let w=0;w<s;w++){const S=w*Ue,E=a[S],v=a[S+1],$=a[S+2],j=a[S+3],W=16383&v,H=v>>>14&16383,N=v>>>28&15|(1023&$)<<4,X=Ja[j>>>24],te=($>>>10&255)+X,Pe=($>>>18&255)+X,ce=($>>>26&63|(3&j)<<6)+X,ue=te>0?te:0,ne=Pe>0?Pe:0,Z=ce>0?ce:0,ee=ue|ne<<8|Z<<16,Q=Math.max(ue,ne,Z),re=W*u+h,J=H*u+p,q=N*u+P;if(R[K]=re-y,R[K+1]=J-b,R[K+2]=q-A,c){const ie=re*re+J*J+q*q;_=Math.min(_,ie),D=Math.max(D,ie)}else I=Math.min(I,q),B=Math.max(B,q);G[w]=E,M[w]=ee,Q>Y&&(Y=Q),K+=3,V++,V===yt.createRenderableBatchSize&&(V=0,t.madeProgress()&&(t=yield))}V>0&&t.madeProgress(),c&&(I=Math.sqrt(_)-g,B=Math.sqrt(D)-g);const L=this._extractGaussianSplatMbsRadiusSquared(Y),{fullExtent:z}=this.layer;z?.hasZ&&z.zmax&&z.zmin&&(I=Math.max(I,z.zmin),B=Math.min(B,z.zmax));const f=new gt(I,B),m=new qa(i,l,T,F,R,G,M,s,L,f);return this._memCache.put(`${m.handle}`,m),this._tileHandles.set(i,m),this._cacheTileMemory+=m.usedMemory,{memUsageBytes:m.usedMemory,numGaussians:s}}_extractGaussianSplatMbsRadiusSquared(e){return Math.exp(e/8-20)*Qa}freeRenderable(e){this._tileFadeInsAwaitingInitialSort.delete(e),this._tileFadeOutsAwaitingInitialSort.delete(e);const t=this.data?.textureAtlas;let i=!1;const a=this._tileHandles.get(e);a&&(a.lifecycleState!==0?(i=!0,this.fadeHelper.onTileDiscarded(a),this._usedTileMemory-=a.usedMemory,this._intersectionHandler.removeTile(a)):this._cacheTileMemory-=a.usedMemory,t&&a.pageIds.forEach(s=>t.freePage(s)),this.freeObject(a),this._tileHandles.delete(e)),i&&this.updateGaussians()}freeObject(e){this._memCache.pop(`${e.handle}`)}notifyTileObbsChanged(e){this._elevationProvider&&this._elevationProvider.notifyObjectsChangedFunctional(t=>{for(const i of e)t(i.obb)})}setRenderableVisibility(e,t,i){const a=this._currentLyr3dVisibilityChange+1,s=this.fadeHelper.updateFadeDuration();this._fadeDurationPerVisibilityChange.set(a,s);let r=!1;for(let o=0;o<i;o++){const u=this._tileHandles.get(e[o]);if(!u)continue;const l=t[o]?this._prepareTileFadeIn(u,a,s):this._prepareTileFadeOut(u,a);r||=l}r?(this._currentLyr3dVisibilityChange=a,this.updateGaussians()):this._fadeDurationPerVisibilityChange.delete(a)}_prepareTileFadeIn(e,t,i){const a=this._tileFadeOutsAwaitingInitialSort.delete(e.handle);return e.lifecycleState===2?(this.fadeHelper.fadeTile(e,0,i),!1):this._tileFadeInsAwaitingInitialSort.get(e.handle)!==t?(e.lifecycleState===0&&this._popTileFromCache(e),e.lifecycleState=1,this._tileFadeInsAwaitingInitialSort.set(e.handle,t),!0):a}_prepareTileFadeOut(e,t){const i=this._tileFadeInsAwaitingInitialSort.delete(e.handle);return i&&e.lifecycleState===1&&(this.moveTileToCache(e),e.lifecycleState=0),e.lifecycleState!==2?i:this._tileFadeOutsAwaitingInitialSort.get(e.handle)!==t?(this._tileFadeOutsAwaitingInitialSort.set(e.handle,t),!0):i}_onSortComplete(e,t){const i=this._tmpTilesWithChangedVisibility;i.length=0;const a=this._tmpSortedTileHandles;a.clear();for(let r=0;r<e.length;r++){const o=e[r];a.add(o.handle)}this._triggerFadeIns(t,a,i);const s=this._triggerFadeOuts(t,i);a.clear(),i.length>0&&this.notifyTileObbsChanged(i),s&&this.updateGaussians(),this._cleanupVisibilityChangeFadeDurations(t)}_triggerFadeIns(e,t,i){for(const[a,s]of this._tileFadeInsAwaitingInitialSort){if(s>e||!t.has(a))continue;const r=this._tileHandles.get(a);if(!r){this._tileFadeInsAwaitingInitialSort.delete(a);continue}const o=this._getFadeDurationForPendingVisibilityChange(s),u=r.lifecycleState===0;r.lifecycleState!==2&&(r.lifecycleState=2,u&&this._popTileFromCache(r),i.push(r)),this.fadeHelper.fadeTile(r,0,o),this._tileFadeInsAwaitingInitialSort.delete(a)}}_triggerFadeOuts(e,t){let i=!1;for(const[a,s]of this._tileFadeOutsAwaitingInitialSort){if(s>e)continue;const r=this._tileHandles.get(a);if(r){const o=r.lifecycleState===2,u=this._getFadeDurationForPendingVisibilityChange(s);this.fadeHelper.fadeTile(r,1,u),o&&r.lifecycleState===0&&(t.push(r),i=!0)}this._tileFadeOutsAwaitingInitialSort.delete(a)}return i}_getFadeDurationForPendingVisibilityChange(e){return this._fadeDurationPerVisibilityChange.get(e)??this.fadeHelper.baseFadeDuration}_cleanupVisibilityChangeFadeDurations(e){if(this._fadeDurationPerVisibilityChange.size!==0)for(const t of this._fadeDurationPerVisibilityChange.keys())t<=e&&this._fadeDurationPerVisibilityChange.delete(t)}_popTileFromCache(e){this._usedTileMemory+=e.usedMemory,this._cacheTileMemory-=e.usedMemory,this._intersectionHandler.addTile(e),this._memCache.pop(Nt(e.handle))}moveTileToCache(e){this._usedTileMemory-=e.usedMemory,this._cacheTileMemory+=e.usedMemory,this._intersectionHandler.removeTile(e),this._memCache.put(Nt(e.handle),e)}destroy(){this._createRenderableAbortController.abort(),ca(this),this._suspendedHandle&&(this._suspendedHandle=ua(this._suspendedHandle)),this._intersectionHandler&&(this.view.sceneIntersectionHelper.removeIntersectionHandler(this._intersectionHandler),this._intersectionHandler=null),this._elevationProvider&&this.view.elevationProvider&&(this._elevationProvider.notifyObjectsChangedFunctional(e=>{for(const t of this._tileHandles.values())e(t.obb)}),this.view.elevationProvider.unregister(this._elevationProvider),this._elevationProvider=null),this._frameTask.remove(),this._shadowRenderNode=ht(this._shadowRenderNode),this._renderNode=ht(this._renderNode),this._memCache.destroy(),this.data=ht(this.data)}_canProjectWithoutEngine(){if(this.view.state.viewingMode===1||da(this.view.renderSpatialReference)||ha(this.view.renderSpatialReference))return!0;if(this.layer.esriCrsSpatialReference&&pa(this.layer.esriCrsSpatialReference,this.view.renderSpatialReference)){if(this.layer.esriCrsSpatialReference.vcsWkid===115700)return!1;let e=wa(this.layer.esriCrsSpatialReference);if(!e){const i=this.layer.esriCrsSpatialReference;let a="meters";!fa(i)&&i.wkid&&i.wkid!==-1&&(a=ma(Wt.units[Wt[i.wkid]])),a&&(e=new ga({heightModel:"gravity-related-height",heightUnit:a}))}const t=this.view.heightModelInfo;return this._useEsriCrs=va(e,t,!1)===0,this._useEsriCrs&&(e&&(this._metersPerVCSUnit=_a(1,e.heightUnit,"meters")),this.fullExtentInLocalViewSpatialReference=this.layer.esriCrsFullExtent),this._useEsriCrs}return!1}_elevationInfoChanged(e){if(e?.offset)if(this._useEsriCrs){const t=xa(e?.unit)/this._metersPerVCSUnit,i=e?.offset??0;this._wasm?.setLayerOffset(this,i*t)}else this._wasm?.setLayerOffset(this,jt(e));else this._wasm?.setLayerOffset(this,0)}_slicePlaneEnabledChanged(e){this._renderNode&&(this._renderNode.slicePlaneEnabled=e),this._intersectionHandler&&(this._intersectionHandler.slicePlaneEnabled=e)}updateGaussians(){const e=new Array;for(const t of this._tileHandles.values())t.lifecycleState!==0&&e.push(t);this.data.updateGaussianVisibility(e,this._currentLyr3dVisibilityChange),this.notifyChange("updating")}setMaximumGaussianCount(e){this._wasm?.setMaximumGaussianSplatCount(e)}_freeInvisibleTiles(){for(const e of this._tileHandles.values())e.lifecycleState===0&&this._deleteTile(e)}extractHeader(e){const t=e.length-4,i=this.reinterpretU32AsFloat(e[t]),a=this.reinterpretU32AsFloat(e[t+1]),s=this.reinterpretU32AsFloat(e[t+2]),r=1/(1<<(255&e[t+3]));return{packedHeader:e.subarray(t,t+4),tileOrigin:{x:i,y:a,z:s},invPosScale:r}}_deleteTile(e){this._wasm?.onRenderableEvicted(this,e.handle,e.usedMemory),this.freeRenderable(e.handle)}reinterpretU32AsFloat(e){return this._u32View[0]=e,this._f32View[0]}get performanceInfo(){let e=0,t=0;this._tileHandles.forEach(o=>{o.lifecycleState===0?t++:e++});const i=this.data?.textureAtlasMemory??0,a=this.data?.orderTextureMemory??0,s=this.data?.fadingTextureMemory??0,r=this.data?.sortBufferMemory??0;return new Ra(this.usedMemory,e,this._usedTileMemory,t,this._cacheTileMemory,i,a,s,r)}get test(){}},yt=Se,Se.createRenderableBatchSize=64,Se);C([fe()],ve.prototype,"layer",void 0),C([fe({readOnly:!0})],ve.prototype,"_clippingBox",null),C([fe()],ve.prototype,"elevationOffset",null),C([fe({readOnly:!0})],ve.prototype,"visibleAtCurrentScale",null),C([fe()],ve.prototype,"fullExtentInLocalViewSpatialReference",void 0),ve=yt=C([Ce("esri.views.3d.layers.GaussianSplatLayerView3D")],ve);const ws=ve,Ka=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:Ft,build:xi},Symbol.toStringTag,{value:"Module"})),es=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:It,build:bi},Symbol.toStringTag,{value:"Module"})),ts=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:Gt,build:_i},Symbol.toStringTag,{value:"Module"})),is=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:zt,build:wi},Symbol.toStringTag,{value:"Module"}));export{ws as default};
