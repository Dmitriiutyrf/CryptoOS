"use client";
import React, { useState } from 'react';

// Define the structure for our form data
interface FormData {
  services: string[];
  objectType: string;
  area: number;
  videoDetails: {
    internalCameras: number;
    externalCameras: number;
  };
  accessControlDetails: {
    points: number;
  };
  fireAlarmDetails: {
    sensors: number;
  };
  equipmentClass: string;
  needsIntegration: boolean;
}

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

const EstimateCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    services: [],
    objectType: 'office',
    area: 50,
    videoDetails: { internalCameras: 2, externalCameras: 2 },
    accessControlDetails: { points: 1 },
    fireAlarmDetails: { sensors: 5 },
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => {
      const currentServices = prev.services || [];
      const newServices = currentServices.includes(serviceId)
        ? currentServices.filter(s => s !== serviceId)
        : [...currentServices, serviceId];
      return { ...prev, services: newServices };
    });
  };
  
  const handleInputChange = (field: keyof Omit<FormData, 'videoDetails' | 'accessControlDetails' | 'fireAlarmDetails'>, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (detailType: 'videoDetails' | 'accessControlDetails' | 'fireAlarmDetails', field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [detailType]: {
        ...prev[detailType],
        [field]: value,
      },
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="step-title">Шаг 1: Выберите необходимые услуги</h3>
            <p className="step-description">Вы можете выбрать одну или несколько услуг.</p>
            <div className="service-options">
              {serviceOptions.map(service => (
                <div
                  key={service.id}
                  className={`service-card ${formData.services?.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  {service.name}
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
            <div>
                <h3 className="step-title">Шаг 2: Информация об объекте</h3>
                <p className="step-description">Укажите тип и площадь вашего объекта.</p>
                <div className="form-group">
                    <label>Тип объекта</label>
                    <div className="object-type-options">
                        {objectTypeOptions.map(option => (
                            <div
                                key={option.id}
                                className={`object-type-card ${formData.objectType === option.id ? 'selected' : ''}`}
                                onClick={() => handleInputChange('objectType', option.id)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="area">Площадь объекта (м²): {formData.area}</label>
                    <input
                        type="range"
                        id="area"
                        min="10"
                        max="5000"
                        step="10"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', parseInt(e.target.value))}
                        className="slider"
                    />
                </div>
            </div>
        );
    case 3:
        return(
            <div>
                <h3 className="step-title">Шаг 3: Детализация услуг</h3>
                <p className="step-description">Уточните параметры для выбранных услуг.</p>

                {formData.services?.includes('video') && (
                    <div className="form-group stacked">
                        <h4>Видеонаблюдение</h4>
                        <label>Количество внутренних камер: {formData.videoDetails?.internalCameras}</label>
                        <input type="range" min="0" max="50" value={formData.videoDetails?.internalCameras} onChange={(e) => handleDetailChange('videoDetails', 'internalCameras', parseInt(e.target.value))} className="slider" />

                        <label>Количество уличных камер: {formData.videoDetails?.externalCameras}</label>
                        <input type="range" min="0" max="50" value={formData.videoDetails?.externalCameras} onChange={(e) => handleDetailChange('videoDetails', 'externalCameras', parseInt(e.target.value))} className="slider" />
                    </div>
                )}

                {formData.services?.includes('access') && (
                     <div className="form-group stacked">
                        <h4>Контроль доступа</h4>
                        <label>Количество дверей/точек прохода: {formData.accessControlDetails?.points}</label>
                        <input type="range" min="0" max="100" value={formData.accessControlDetails?.points} onChange={(e) => handleDetailChange('accessControlDetails', 'points', parseInt(e.target.value))} className="slider" />
                    </div>
                )}

                {formData.services?.includes('fire') && (
                     <div className="form-group stacked">
                        <h4>Пожарная сигнализация</h4>
                        <label>Примерное количество датчиков: {formData.fireAlarmDetails?.sensors}</label>
                        <input type="range" min="0" max="200" value={formData.fireAlarmDetails?.sensors} onChange={(e) => handleDetailChange('fireAlarmDetails', 'sensors', parseInt(e.target.value))} className="slider" />
                    </div>
                )}

                {formData.services?.length === 0 && <p className="step-description">Пожалуйста, вернитесь на Шаг 1 и выберите хотя бы одну услугу.</p>}
            </div>
        )
      default:
        return <div>Спасибо!</div>;
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
          {step < 5 && <button onClick={handleNext} className="cta-button">Далее</button>}
          {step === 5 && <button className="cta-button">Рассчитать</button>}
        </div>
      </div>
    </section>
  );
};

export default EstimateCalculator;
