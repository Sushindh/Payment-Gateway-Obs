import logging
from opentelemetry import trace, metrics, _logs
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.resources import Resource
#METRICS
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
#TRACES
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
#LOGS
from opentelemetry.sdk._logs import LoggingHandler, LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter 

resource = Resource.create({"service.name":"fastapi-admin"})

#METRIC
metric_exporter = OTLPMetricExporter(endpoint="alloy:4317", insecure=True)
metric_reader = PeriodicExportingMetricReader(metric_exporter)
metric_provider = MeterProvider(resource=resource, metric_readers=[metric_reader])
metrics.set_meter_provider(metric_provider)
meter = metrics.get_meter("app.metrics")

#TRACES
trace_exporter = OTLPSpanExporter(endpoint="alloy:4317", insecure=True)
trace_processor = BatchSpanProcessor(trace_exporter)
trace_provider = TracerProvider(resource=resource)
trace_provider.add_span_processor(trace_processor)
trace.set_tracer_provider(trace_provider)
tracer = trace.get_tracer(__name__)

#LOGS
logs_exporter = OTLPLogExporter(endpoint="alloy:4317", insecure=True)
logs_processor = BatchLogRecordProcessor(logs_exporter)
logs_provider = LoggerProvider(resource=resource)
logs_provider.add_log_record_processor(logs_processor)
_logs.set_logger_provider(logs_provider)

handler = LoggingHandler(level=logging.ERROR)
logging.getLogger().addHandler(handler)