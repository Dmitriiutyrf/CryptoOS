"use client";
import React, { useState } from 'react';
import { saveEstimate } from '@/app/actions';

// --- Interfaces ---
interface ServiceSelection {
  id: string;
  name: string;
  price: number;
}

interface FormData {
  projectName: string;
  clientName: string;
  services: string[];
  objectType: string;
  area: number;
  videoDetails: { internalCameras: number; externalCameras: number };
  accessControlDetails: { points: number };
  fireAlarmDetails: { sensors: number };
}

// --- Constants ---
const serviceOptions = [
  { id: 'video', name: 'Видеонаблюдение' },
  { id: 'access', name: 'Контроль доступа' },
  { id: 'fire', name: 'Пожарная сигнализация' },
  { id: 'sks', name: 'Структурированные кабельные системы (СКС)' },
];

const objectTypeOptions = [
    { id: 'office', name: 'Офис' },
    { id: 'warehouse', name: 'Склад' },
    { id: 'store', name: 'Магазин' },
    { id: 'house', name: 'Частный дом' },
    { id: 'apartment', name: 'Квартира' },
];

// --- Pricing (can be moved to a config file) ---
const PRICING = {
  video: { base: 5000, perInternalCamera: 2500, perExternalCamera: 4000 },
  access: { base: 8000, perPoint: 3500 },
  fire: { base: 10000, perSensor: 1500 },
  sks: { base: 15000, perSqMeter: 100 },
};


const EstimateCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    clientName: '',
    services: [],
    objectType: 'office',
    area: 50,
    videoDetails: { internalCameras: 2, externalCameras: 2 },
    accessControlDetails: { points: 1 },
    fireAlarmDetails: { sensors: 5 },
  });
  const [calculation, setCalculation] = useState<{ services: ServiceSelection[], totalCost: number } | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'loading' | 'success' | 'error' } | null>(null);

  // --- Handlers ---
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => {
    setSubmissionStatus(null);
    if (step === 5) {
        setCalculation(null); // Reset calculation when going back from summary
    }
    setStep(prev => prev - 1);
  };
  
  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleInputChange = (field: keyof Omit<FormData, 'videoDetails' | 'accessControlDetails' | 'fireAlarmDetails'>, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (detailType: 'videoDetails' | 'accessControlDetails' | 'fireAlarmDetails', field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [detailType]: { ...prev[detailType], [field]: value, },
    }));
  };
  
  const handleCalculate = () => {
    let totalCost = 0;
    const services: ServiceSelection[] = [];

    if (formData.services.includes('video')) {
      const videoCost = PRICING.video.base + 
                        (formData.videoDetails.internalCameras * PRICING.video.perInternalCamera) +
                        (formData.videoDetails.externalCameras * PRICING.video.perExternalCamera);
      services.push({ id: 'video', name: 'Видеонаблюдение', price: videoCost });
      totalCost += videoCost;
    }
    if (formData.services.includes('access')) {
      const accessCost = PRICING.access.base + (formData.accessControlDetails.points * PRICING.access.perPoint);
      services.push({ id: 'access', name: 'Контроль доступа', price: accessCost });
      totalCost += accessCost;
    }
    if (formData.services.includes('fire')) {
        const fireCost = PRICING.fire.base + (formData.fireAlarmDetails.sensors * PRICING.fire.perSensor);
        services.push({ id: 'fire', name: 'Пожарная сигнализация', price: fireCost });
        totalCost += fireCost;
    }
    if (formData.services.includes('sks')) {
        const sksCost = PRICING.sks.base + (formData.area * PRICING.sks.perSqMeter);
        services.push({ id: 'sks', name: 'Структурированные кабельные системы', price: sksCost });
        totalCost += sksCost;
    }

    setCalculation({ services, totalCost });
    handleNext();
  };

  const handleSaveEstimate = async () => {
    if (!calculation) return;
    setSubmissionStatus({ message: 'Сохранение...', type: 'loading' });
    
    const result = await saveEstimate({
      projectName: formData.projectName,
      clientName: formData.clientName,
      services: calculation.services.map(s => ({ name: s.name, price: s.price })),
      totalCost: calculation.totalCost,
    });
    
    setSubmissionStatus({ message: result.message, type: result.success ? 'success' : 'error' });
  };
  

  // --- Render Methods ---
  const renderStep = () => {
    switch (step) {
      case 1: // Service Selection
        return (
          <div>
            <h3 className="step-title">Шаг 1: Выберите услуги</h3>
            <p className="step-description">Вы можете выбрать одну или несколько услуг.</p>
            <div className="service-options">
              {serviceOptions.map(service => (
                <div key={service.id} className={`service-card ${formData.services.includes(service.id) ? 'selected' : ''}`} onClick={() => handleServiceToggle(service.id)}>
                  {service.name}
                </div>
              ))}
            </div>
          </div>
        );
      case 2: // Object Info
        return (
            <div>
                <h3 className="step-title">Шаг 2: Информация об объекте</h3>
                <p className="step-description">Укажите тип и площадь вашего объекта.</p>
                <div className="form-group">
                    <label>Тип объекта</label>
                    <div className="object-type-options">
                        {objectTypeOptions.map(option => (
                            <div key={option.id} className={`object-type-card ${formData.objectType === option.id ? 'selected' : ''}`} onClick={() => handleInputChange('objectType', option.id)}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="area">Площадь объекта (м²): {formData.area}</label>
                    <input type="range" id="area" min="10" max="5000" step="10" value={formData.area} onChange={(e) => handleInputChange('area', parseInt(e.target.value))} className="slider" />
                </div>
            </div>
        );
    case 3: // Service Details
        return(
            <div>
                <h3 className="step-title">Шаг 3: Детализация услуг</h3>
                <p className="step-description">Уточните параметры для выбранных услуг.</p>

                {formData.services.includes('video') && (
                    <div className="form-group stacked">
                        <h4>Видеонаблюдение</h4>
                        <label>Количество внутренних камер: {formData.videoDetails.internalCameras}</label>
                        <input type="range" min="0" max="50" value={formData.videoDetails.internalCameras} onChange={(e) => handleDetailChange('videoDetails', 'internalCameras', parseInt(e.target.value))} className="slider" />

                        <label>Количество уличных камер: {formData.videoDetails.externalCameras}</label>
                        <input type="range" min="0" max="50" value={formData.videoDetails.externalCameras} onChange={(e) => handleDetailChange('videoDetails', 'externalCameras', parseInt(e.target.value))} className="slider" />
                    </div>
                )}
                {formData.services.includes('access') && (
                     <div className="form-group stacked">
                        <h4>Контроль доступа</h4>
                        <label>Количество дверей/точек прохода: {formData.accessControlDetails.points}</label>
                        <input type="range" min="0" max="100" value={formData.accessControlDetails.points} onChange={(e) => handleDetailChange('accessControlDetails', 'points', parseInt(e.target.value))} className="slider" />
                    </div>
                )}
                {formData.services.includes('fire') && (
                     <div className="form-group stacked">
                        <h4>Пожарная сигнализация</h4>
                        <label>Количество пожарных датчиков (шт): {formData.fireAlarmDetails.sensors}</label>
                        <input type="range" min="0" max="200" value={formData.fireAlarmDetails.sensors} onChange={(e) => handleDetailChange('fireAlarmDetails', 'sensors', parseInt(e.target.value))} className="slider" />
                    </div>
                )}
                {formData.services.length === 0 && <p className="step-description">Выберите хотя бы одну услугу на Шаге 1.</p>}
            </div>
        )
      case 4: // Project Info
        return (
            <div>
                <h3 className="step-title">Шаг 4: Информация о проекте</h3>
                <p className="step-description">Эти данные будут сохранены в смете.</p>
                <div className="form-group stacked">
                    <label htmlFor="projectName">Название проекта</label>
                    <input type="text" id="projectName" value={formData.projectName} onChange={(e) => handleInputChange('projectName', e.target.value)} placeholder="Например, 'Безопасность склада'" />
                </div>
                <div className="form-group stacked">
                    <label htmlFor="clientName">Ваше имя</label>
                    <input type="text" id="clientName" value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} placeholder="Например, 'Иван Петров'" />
                </div>
            </div>
        )
      case 5: // Summary & Save
        return (
            <div>
                <h3 className="step-title">Шаг 5: Ваша предварительная смета</h3>
                {calculation && (
                    <div className="summary">
                        <p><strong>Проект:</strong> {formData.projectName || 'Не указан'}</p>
                        <p><strong>Клиент:</strong> {formData.clientName || 'Не указан'}</p>
                        <hr/>
                        <h4>Детализация:</h4>
                        <ul>
                            {calculation.services.map(s => <li key={s.id}>{s.name}: <strong>{s.price.toLocaleString('ru-RU')} ₽</strong></li>)}
                        </ul>
                        <hr/>
                        <h4 className="total-cost">Итоговая стоимость: {calculation.totalCost.toLocaleString('ru-RU')} ₽</h4>

                        {submissionStatus && <p className={`submission-status ${submissionStatus.type}`}>{submissionStatus.message}</p>}
                    </div>
                )}
            </div>
        );
      default:
        return <div>Что-то пошло не так.</div>;
    }
  };

  return (
    <section id="calculator" className="calculator">
      <h2>Расчёт предварительной сметы</h2>
      <div className="calculator-container">
        <div className="calculator-form">
          {renderStep()}
        </div>
        <div className="calculator-nav">
          {step > 1 && <button onClick={handleBack} className="cta-button secondary">Назад</button>}
          {step < 4 && <button onClick={handleNext} className="cta-button" disabled={formData.services.length === 0}>Далее</button>}
          {step === 4 && <button onClick={handleCalculate} className="cta-button" disabled={!formData.projectName || !formData.clientName}>Рассчитать</button>}
          {step === 5 && submissionStatus?.type !== 'success' && (
            <button 
              onClick={handleSaveEstimate} 
              className="cta-button" 
              disabled={submissionStatus?.type === 'loading'}
            >
              {submissionStatus?.type === 'loading' ? 'Сохранение...' : 'Сохранить смету'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EstimateCalculator;
