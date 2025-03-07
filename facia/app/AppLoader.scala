import agents.MostViewedAgent
import akka.actor.ActorSystem
import app.{FrontendApplicationLoader, FrontendBuildInfo, FrontendComponents}
import com.softwaremill.macwire._
import common._
import common.Logback.{LogbackOperationsPool, LogstashLifecycle}
import common.dfp.FaciaDfpAgentLifecycle
import concurrent.BlockingOperations
import conf.switches.SwitchboardLifecycle
import conf.CachedHealthCheckLifeCycle
import contentapi.{CapiHttpClient, ContentApiClient, HttpClient}
import controllers.{FaciaControllers, HealthCheck}
import dev.{DevAssetsController, DevParametersHttpRequestHandler}
import feed.MostViewedLifecycle
import http.{CommonFilters, PreloadFilters}
import model.ApplicationIdentity
import services.ophan.SurgingContentAgentLifecycle
import play.api.ApplicationLoader.Context
import play.api.BuiltInComponentsFromContext
import play.api.http.HttpRequestHandler
import play.api.mvc.EssentialFilter
import play.api.routing.Router
import play.api.libs.ws.WSClient
import services._
import services.fronts.{FrontJsonFapiDraft, FrontJsonFapiLive}
import router.Routes

class AppLoader extends FrontendApplicationLoader {
  override def buildComponents(context: Context): FrontendComponents =
    new BuiltInComponentsFromContext(context) with AppComponents
}

trait FapiServices {
  def wsClient: WSClient
  def actorSystem: ActorSystem
  lazy val frontJsonFapiLive = wire[FrontJsonFapiLive]
  lazy val frontJsonFapiDraft = wire[FrontJsonFapiDraft]
  lazy val blockingOperations = wire[BlockingOperations]
}

trait AppComponents extends FrontendComponents with FaciaControllers with FapiServices {

  lazy val capiHttpClient: HttpClient = wire[CapiHttpClient]
  lazy val contentApiClient = wire[ContentApiClient]
  lazy val healthCheck = wire[HealthCheck]
  lazy val devAssetsController = wire[DevAssetsController]
  lazy val ophanApi = wire[OphanApi]
  lazy val logbackOperationsPool = wire[LogbackOperationsPool]
  lazy val mostViewedAgent = wire[MostViewedAgent]

  override lazy val lifecycleComponents = List(
    wire[LogstashLifecycle],
    wire[ConfigAgentLifecycle],
    wire[CloudWatchMetricsLifecycle],
    wire[FaciaDfpAgentLifecycle],
    wire[SurgingContentAgentLifecycle],
    wire[IndexListingsLifecycle],
    wire[SwitchboardLifecycle],
    wire[CachedHealthCheckLifeCycle],
    wire[MostViewedLifecycle],
  )

  lazy val router: Router = wire[Routes]

  lazy val appIdentity = ApplicationIdentity("facia")

  override lazy val appMetrics = ApplicationMetrics(
    FaciaPressMetrics.FrontDecodingLatency,
    FaciaPressMetrics.FrontDownloadLatency,
    DCRMetrics.DCRLatencyMetric,
    DCRMetrics.DCRRequestCountMetric,
  )

  val frontendBuildInfo: FrontendBuildInfo = frontend.facia.BuildInfo
  override lazy val httpFilters: Seq[EssentialFilter] = wire[CommonFilters].filters ++ wire[PreloadFilters].filters
  override lazy val httpRequestHandler: HttpRequestHandler = wire[DevParametersHttpRequestHandler]

  def actorSystem: ActorSystem
}
